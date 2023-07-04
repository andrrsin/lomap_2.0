import {Marker} from "./marker";
import { fetch } from "@inrupt/solid-client-authn-browser";
import { overwriteFile,getFile,isRawData } from "@inrupt/solid-client";


import {Friend} from "./types";
import {
  createThing, removeThing,Thing,getThing, setThing,buildThing,
  getSolidDataset, saveSolidDatasetAt, getThingAll,
  getUrlAll, getUrl,
  getStringNoLocale,
  createSolidDataset, deleteSolidDataset
} from "@inrupt/solid-client";



import { FOAF, VCARD, SCHEMA_INRUPT, RDF} from "@inrupt/vocab-common-rdf"

import {v4 as uuid} from "uuid" // for the uuids of the locations



export async function getUserProfile(webID: string) : Promise<Thing>{
    // get the url of the full dataset
    let profile = webID.split("#")[0]; //just in case there is extra information in the url
    // get the dataset from the url
    let dataSet = await getSolidDataset(profile, {fetch: fetch});
    // return the dataset as a thing
    return getThing(dataSet, webID) as Thing;
}


export async function getProfileImage(webID: string) : Promise<string>{
  let profileThing = await getUserProfile(webID);
  let image = getUrl(profileThing, VCARD.hasPhoto) as string;
  return image;
}

export async function getNameFromPod(webID: string){
  if (webID === "" || webID === undefined) return "Name not found";
  let name = getStringNoLocale(await getUserProfile(webID), FOAF.name); // get the name from the profile
  return name !== null ? name : "John Doe"; // if name is not defined, return default name
}

export async function getLocation(locationPath:any): Promise<Marker|null>{
  try{
    let path = getStringNoLocale(locationPath, SCHEMA_INRUPT.identifier) as string;
    let location = await getLocationFromDataset(path)
    return location;
  }catch(error){
    return null;
  }
}


export async function getLocations(webID:string) {
  let baseURL = webID.split("profile")[0]; // url of the type https://<nombreusuario>.provider/
  let inventoryFolder = `${baseURL}private/lomapBITS/inventory/index.ttl`; // locations contained in index.ttl 
 
  let locationPaths; 
  try{
    let dataSet = await getSolidDataset(inventoryFolder, {fetch: fetch}); // get the inventory dataset
    locationPaths = getThingAll(dataSet) // get the things from the dataset (location paths)
    const requests = locationPaths.map(locationPath => getLocation(locationPath));
    
    const results = await Promise.allSettled(requests);
    const successfulResults = results
    .filter(result => result.status === 'fulfilled')
    .map(result => result.status === 'fulfilled' ? result.value : null)
    .filter(value => value !== null) as Marker[];
    return successfulResults;
  }catch(error){
    let successfulResults:any[] = [];
    return successfulResults;
  }
  
}


export async function getLocationFromDataset(locationPath:string){
  let datasetPath = locationPath.split('#')[0] 
  let locationDataset = await getSolidDataset(datasetPath, {fetch: fetch}) 
  let locationAsThing = getThing(locationDataset, locationPath) as Thing; 
  let imagesUrl = datasetPath.slice(0,-9)+"images";//WORKING
  
  let name = getStringNoLocale(locationAsThing, SCHEMA_INRUPT.name) as string; 
  let longitude = getStringNoLocale(locationAsThing, SCHEMA_INRUPT.longitude) as string; 
  let latitude = getStringNoLocale(locationAsThing, SCHEMA_INRUPT.latitude) as string; 
  let description = getStringNoLocale(locationAsThing, SCHEMA_INRUPT.description) as string; 
  let ratings = getStringNoLocale(locationAsThing, SCHEMA_INRUPT.qualifications) as string;

  let url =datasetPath.slice(0,-10)//WORKI
  let category = getStringNoLocale(locationAsThing, SCHEMA_INRUPT.Product) as string;
 
  
  let locationImages: string = ""; 
  locationImages = await getLocationImage(imagesUrl); 

  let results = (getStringNoLocale(locationAsThing, SCHEMA_INRUPT.text) as string);
  let reviews:string[];
  if(results === null) 
    reviews = [];
  else
    reviews = results.split(",");


  let location : Marker = {
      name: name,
      position : {lng: parseFloat(longitude), lat: parseFloat(latitude)},
      description: description,
      url: url,
      category: category,
      image: locationImages,
      reviews: reviews,
      ratings: parseFloat(ratings)
  }
  return location;
}



export async function getLocationImage(imagesFolderUrl:string){
  let images: string[] = [];
  let imagesThings;
  try {
    let imagesDataSet = await getSolidDataset(imagesFolderUrl, {fetch: fetch}); // get images dataset
    imagesThings = getThingAll(imagesDataSet) // get all the things in the images dataset
    for (let image of imagesThings){
      try{
      const file = await getFile(
        image.url,               // File in Pod to Read
        { fetch: fetch }       // fetch from authenticated session
      );
      if(isRawData(file)){//If it's a file(not dataset)
        images.push(URL.createObjectURL(file));//Creates the file as URL and pushes it to the
      }
    }catch(e){

    }
  
      
      }
  } catch (error){
    // if the dataset does not exist, return empty array of images
    images = [""];
  }
  return images[0];
}


export async function createLocation(webID:string, location:Marker) {
  let baseURL = webID.split("profile")[0]; // url of the type https://<nombre>.inrupt.net/
  let locationsFolder = `${baseURL}private/lomapBITS/inventory/index.ttl`; // inventory folder path
  let locationId;
  // add location to inventory
  try {
    locationId = await addLocationToInventory(locationsFolder, location) // add the location to the inventory and get its ID
  } catch (error){
    // if the inventory does not exist, create it and add the location
    locationId = await createInventory(locationsFolder, location)
  }

  // path for the new location dataset
  let individualLocationFolder = `${baseURL}private/lomapBITS/locations/${locationId}/index.ttl`
  let folder = `${baseURL}private/lomapBITS/locations/${locationId}`
  // create dataset for the location
  try {
    await createLocationDataSet(folder,individualLocationFolder, location, locationId as string)
  } catch (error) {
    console.log(error)
  }
}


export async function addLocationToInventory(locationsFolder:string, location:Marker) {
  let inventory = await getSolidDataset(locationsFolder, {fetch: fetch}) // get the inventory
  let locationId = "LOC_" + uuid(); // create location uuid
  let baseURL = locationsFolder.split("private")[0]
  let locationURL = `${baseURL}private/lomapBITS/locations/${locationId}/index.ttl#${locationId}` // create location dataset path

  let newLocation = buildThing(createThing({name: locationId}))
    .addStringNoLocale(SCHEMA_INRUPT.identifier, locationURL) // add to the thing the path of the location dataset
    .build();
  
  inventory = setThing(inventory, newLocation); // add thing to inventory
  try {
    await saveSolidDatasetAt(locationsFolder, inventory, {fetch: fetch}) //save the inventory
    return locationId;
  } catch (error) {
    console.log(error);
  }
}


export async function createInventory(locationsFolder: string, location:Marker){
  let locationId = "LOC_" + uuid(); // location uuid
  let baseURL = locationsFolder.split("private")[0]
  let locationURL = `${baseURL}private/lomapBITS/locations/${locationId}/index.ttl#${locationId}` // location dataset path

  let inventory = createSolidDataset() // create dataset for the inventory

  let newLocation = buildThing(createThing({name: locationId})) // create thing with the location dataset path
    .addStringNoLocale(SCHEMA_INRUPT.identifier, locationURL)
    .build();
  
  inventory = setThing(inventory, newLocation); // add name to inventory
  try {
    await saveSolidDatasetAt(locationsFolder, inventory, {fetch: fetch}) // save inventory dataset
    return locationId;
  } catch (error) {
    console.log(error);
  }
}



export async function createLocationDataSet(folder:string,locationFolder:string, location:Marker, id:string) {
  let locationIdUrl = `${locationFolder}#${id}` // construct the url of the location

  let locationImages = folder+"/images";
  // create dataset for the location
  let dataSet = createSolidDataset();

  // build location thing
  let newLocation = buildThing(createThing({name: id})) 
  .addStringNoLocale(SCHEMA_INRUPT.name, location.name.toString())
  .addStringNoLocale(SCHEMA_INRUPT.longitude, location.position.lng.toString())
  .addStringNoLocale(SCHEMA_INRUPT.latitude, location.position.lat.toString())
  .addStringNoLocale(SCHEMA_INRUPT.description, location.description.toString())
  .addStringNoLocale(SCHEMA_INRUPT.qualifications,location.ratings.toString())
  .addStringNoLocale(SCHEMA_INRUPT.identifier, locationIdUrl) // store the url of the location
  .addStringNoLocale(SCHEMA_INRUPT.Product, location.category) // store string containing the categories
  .addUrl(RDF.type, "https://schema.org/Place")
  .build();


  dataSet = setThing(dataSet, newLocation); // store thing in dataset
  // save dataset to later add the images
  await saveSolidDatasetAt(locationFolder, dataSet, {fetch: fetch}) // save dataset 
  await addImages(locationImages,location); // store the images
}



export async function addLocationReview(location:Marker, review:string, rating:number){

  let url = location.url as string;
  let aux = url.split("/");
  let ID = aux[aux.length-1]; // get the ID of the location
  let locationUrl = location.url+"/index.ttl#"+ID; // construct the url of the location "ID/index.ttl#ID"
  let locationFolder = location.url+"/index.ttl";
  let dataSet = await getSolidDataset(locationUrl, {fetch: fetch})

  let reviews = "";
  for (let review of location.reviews){
    reviews += review + ",";
  }
  reviews += review;

let newLocation = buildThing(createThing({name: ID})) 
  .addStringNoLocale(SCHEMA_INRUPT.name, location.name.toString())
  .addStringNoLocale(SCHEMA_INRUPT.longitude, location.position.lng.toString())
  .addStringNoLocale(SCHEMA_INRUPT.latitude, location.position.lat.toString())
  .addStringNoLocale(SCHEMA_INRUPT.description, location.description.toString())
  .addStringNoLocale(SCHEMA_INRUPT.qualifications,rating.toString())
  .addStringNoLocale(SCHEMA_INRUPT.identifier, url) // store the url of the location
  .addStringNoLocale(SCHEMA_INRUPT.Product, location.category) // store string containing the categories
  .addStringNoLocale(SCHEMA_INRUPT.text,reviews )

  .addUrl(RDF.type, "https://schema.org/Place")
  .build();


  dataSet = setThing(dataSet, newLocation); // store thing in dataset
  // save dataset to later add the images
  await saveSolidDatasetAt(locationFolder, dataSet, {fetch: fetch}) // save dataset 
 
}


export async function addImages(url: string, location:Marker){

      if (location.imagesAsFile === undefined) return;
      await overwriteFile(  
        url+"/"+location.imagesAsFile.name,                              
        location.imagesAsFile,                                       
        { contentType: location.imagesAsFile.type, fetch: fetch }    
      );

  
}


export async function deleteLocation(webID:string, locationUrl: string) {
  //HOLA
 // let url = locationUrl.split("#")[0] as string; // get location dataset path
  
  let url = locationUrl + "/index.ttl" as string//HOLA

  let aux = locationUrl.split("/"); 
  let ID = aux[aux.length-1]; 

  let inventory = `${locationUrl.split("locations")[0]}inventory/index.ttl`;
  let locationUrlInventory = `${inventory}#${ID}`
  try {
    let dataset = await getSolidDataset(url, {fetch:fetch}) // remove location dataset
    await deleteSolidDataset(dataset, {fetch: fetch})

    // remove location from inventory
    let inventoryDataset = await getSolidDataset(inventory, {fetch:fetch})
    let locationToDelete = getThing(inventoryDataset, locationUrlInventory)

    if (locationToDelete === null) return Promise.reject();
    // remove the location
    inventoryDataset = removeThing(inventoryDataset, locationToDelete);
    // update the dataset
    return await saveSolidDatasetAt(inventory, inventoryDataset, { fetch: fetch });

  } catch (error){
    return Promise.reject()
  }
}





export async function addSolidFriend(webID: string,friendURL: string): Promise<{error:boolean, errorMessage:string}>{
  let profile = webID.split("#")[0];
  let dataSet = await getSolidDataset(profile+"#me", {fetch: fetch});//dataset card me

  let thing =await getThing(dataSet, profile+"#me") as Thing; // :me from dataset

  try{
    let newFriend = buildThing(thing)
    .addUrl(FOAF.knows, friendURL as string)
    .build();
      
    

    let friends = await getSolidFriends(webID);
    if(friends.some(f => f.webID === friendURL))
      return{error:true,errorMessage:"You are already friends"}

    dataSet = setThing(dataSet, newFriend);
    dataSet = await saveSolidDatasetAt(webID, dataSet, {fetch: fetch})
  } catch(err){
    return{error:true,errorMessage:"The url is not valid."}
  }

  return{error:false,errorMessage:""}

}
export async function getFriendsID(webID:string){
  
  let friendURLs = getUrlAll(await getUserProfile(webID), FOAF.knows);
  return friendURLs;
}

export async function getSolidFriends(webID:string) {
  
  let friendURLs = getUrlAll(await getUserProfile(webID), FOAF.knows);


  let req = friendURLs.map(friend => getFriendDetails(friend))
  const results = await Promise.allSettled(req);
  const successfulResults = results
  .filter(result => result.status === 'fulfilled')
  .map(result => result.status === 'fulfilled' ? result.value : null)//WORKING
  .filter(value => value !== null) as Friend[];
  return successfulResults;
}
export async function getFriendDetails(friend: string): Promise<Friend | null>{
  try{
        
    let name = getStringNoLocale(await getUserProfile(friend),FOAF.name);
    
  
    let pic = getUrl(await getUserProfile(friend),VCARD.hasPhoto);

    let f = null;

    if (friend){
      let f : Friend = {
        username: name as string,
        webID : friend,
        pfp: pic as string
      };
      return f;
    }
    return f;
  } catch(err){
    return null;
  }
}

