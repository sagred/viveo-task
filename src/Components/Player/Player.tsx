import { FC } from "react";
import "./Player.scss";
import { Player } from "../../Interfaces/player";

type GamePlayer = Player & { indx: number };

const Player: FC<GamePlayer> = ({ id, url, name, time, finish, indx }) => {
  return (
    <tr className="player" key={id}>
      <td>{indx + 1}</td>
      <td>
        <img src={url} />
      </td>
      <td>{name}</td>
      <td>{time}.00s</td>
      <td>{finish ? `${finish}.00s` : "--"}</td>
    </tr>
  );
};

export default Player;
