import React, { useState } from "react";
import { getNameFromPod, getSolidFriends, getProfileImage, getLocations } from "../../utils/solid";
import { useSession } from '@inrupt/solid-ui-react';
import './profile.css';
export default function Profile(): JSX.Element {
    const session = useSession();
    const [name, setName] = React.useState("");
    const [numberFriends, setNumberFriends] = useState("Loading friends...");
    const [image, setImage] = useState("");
    const [score, setScore] = useState(0);
    const [levels, setLevels] = useState(0);
    const [progress, setProgress] = useState(0);

    React.useEffect(() => {
        handleName()
        //we load the image of the user
        if (session.session.info.webId) {
            getProfileImage(session.session.info.webId as string).then((image: string) => {
                setImage(image)
            })
        }
    }, []);



    React.useEffect(() => {
        getNumberOfFriends()
        getScore()
    })

    const handleName = async () => {
        // if we have a valid webid, retrieve the name. Else retrieve generic unidentified name
        if (session.session.info.webId !== undefined && session.session.info.webId !== "") {
            const n = await getNameFromPod(session.session.info.webId as string)
            setName(n)
        }
        else {
            setName("Loading name...")
        }
    }
    const getScore = async () => {
        if (session.session.info.webId) {
            const n = (await getLocations(session.session.info.webId as string)).length
            console.log(n);
            setScore(n*5);
            setLevels(Math.floor(score / 50));
            setProgress((n*5) % 50);

        }
    }

    const getNumberOfFriends = async () => {
        if (session.session.info.webId) {
            const n = (await getSolidFriends(session.session.info.webId as string)).length
            setNumberFriends(n.toString())
        }
    }

    return (
        <div
            className="floating-div profile-div"
            style={{
                position: 'absolute',
                top: 50,
                left: 10,
                background: '#fff',
                padding: 10,
                zIndex: 1,
            }}
        >
            <div className="profile-header">
                <div className="profile-image">

                    <img src={image} />
                </div>
                <h3>{name}</h3>
            </div>
            <div>
                <p className="label">WebID:</p>
                <div className="info">{session.session.info.webId}</div>
                <p className="label">Friends:</p>
                <div className="info">{numberFriends}</div>
                <div>
                    <p className="label">Levels: {levels}      Total Experience: {score}</p>
                    <p className="label">Next level progress</p>
                    <progress className="progress-bar" max="50" value={progress}></progress>
                </div>
            </div>

        </div>
    );
}