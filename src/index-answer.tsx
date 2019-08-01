import * as React from "react";
import * as service from "./service";

const useData = (method: () => Promise<any>, deps: any[] = [], callWhen?: boolean) => {
  const [data, setData] = React.useState();

  React.useEffect(() => {

    if (!callWhen) {
      return;
    }

    method().then((results) => setData(results));

  }, deps);

  return data;
}

export const EachFriend = ({ item }) => {
  const [clicked, setClicked] = React.useState();
  const online = useData(() => service.checkOnline(item.id), [clicked], clicked);

  return (
    <li onClick={() => setClicked(true)}>
      <div className="name">{item.name}</div>
      {clicked === undefined
        ? null
        : <div className="status">{online ? 'Online' : 'Offline'}</div>
      }
    </li>
  )
}

export const MyFriends = () => {
  const friends = useData(() => service.getFriends(), [], true);

  return (
    <ul>
      {friends
        ? (
          friends.map(item => <EachFriend key={item.id} item={item} />)
        )
        : (
          <div className="loader">Loading...</div>
        )
      }
    </ul>
  )
}
