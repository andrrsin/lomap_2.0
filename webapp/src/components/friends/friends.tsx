import React, { useState } from 'react';
import './friends.css';
import { useSession } from '@inrupt/solid-ui-react';
import { getSolidFriends,addSolidFriend } from '../../utils/solid';
import { Friend } from '../../utils/types';

export default function Friends(): JSX.Element {
  const [newFriend, setNewFriend] = useState('');
  const session = useSession();
  const [friends, setFriends] = useState<Friend[]>([]);
  const[error, setError]=React.useState(false);
  const[errorMessage,setErrorMessage]=React.useState("");

  const getFriends = async () => {
    if (session.session.info.webId) {
      const friends = await getSolidFriends(session.session.info.webId as string);
      setFriends(friends);

    }
  }
  React.useEffect(() => {
    async function loadFriends() {
      await getFriends();
    }
    loadFriends()
  }, []);

  const handleNewFriendChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setNewFriend(event.target.value);
  };

  const handleAddFriend = async (event: React.FormEvent) => {
    event.preventDefault();
    if (newFriend) {
      const result = await addSolidFriend(session.session.info.webId as string,newFriend);
      setError(result.error);setErrorMessage(result.errorMessage);


      if(!error){
        await getFriends();
        setNewFriend('');
      }else{
        setNewFriend('User not found!');
      }
    }
  };
  return (
    <div>
      <h3 className="friends-title">Friends</h3>
      <ul className="friends-list">
        {friends.map((friend, index) => (
          <li className="friends-list-item" key={index}>
            <a className="friends-link" href={friend.webID} target="_blank" rel="noopener noreferrer">
              {friend.username}
            </a>
          </li>
        ))}
      </ul>
      <form className="friends-form" onSubmit={handleAddFriend}>
        <input
          className="friends-input"
          type="text"
          value={newFriend}
          onChange={handleNewFriendChange}
          placeholder="Enter friend's name"
        />
        <button className="friends-submit" type="submit">Add Friend</button>
      </form>
    </div>
  );
}