import React, { useState } from 'react';
import './friends.css';

export default function Friends(): JSX.Element {
    const [newFriend, setNewFriend] = useState('');

    const [friends, setFriends] = useState([
      { name: 'John Doe', link: 'https://example.com/johndoe' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
      { name: 'Jane Smith', link: 'https://example.com/janesmith' },
    ]);

    const handleNewFriendChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNewFriend(event.target.value);
      };
    
      const handleAddFriend = (event:React.FormEvent) => {
        event.preventDefault();
        if (newFriend) {
          const newFriends = [...friends, { name: newFriend, link: '' }];
          setFriends(newFriends);
          setNewFriend('');
        }
      };
    return (
        <div>
          <h3 className="friends-title">Friends</h3>
          <ul className="friends-list">
            {friends.map((friend, index) => (
              <li className="friends-list-item" key={index}>
                <a className="friends-link" href={friend.link} target="_blank" rel="noopener noreferrer">
                  {friend.name}
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