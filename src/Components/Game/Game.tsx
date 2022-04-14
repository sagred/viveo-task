import { useEffect, useState } from "react";
import "./Game.scss";
import FlipMove from "react-flip-move";
import { data, dataFinish } from "../../dummyData";
import { Player } from "../../Interfaces/player";

const Game = () => {
  const TIMER_TIME = 15;

  const [timer, setTimer] = useState<number>(0);
  const [dummyTimer, setDummyTimer] = useState<number>(0);
  const [players, setPlayers] = useState<Player[] | []>([]);
  const [dummyState, setDummyState] = useState<Player | number>(123);
  const [finishSort, setFinishSort] = useState<boolean>(true);

  useEffect(() => {
    const filteredPlayer = data.filter((player) => player.time === dummyTimer);
    if (filteredPlayer[0]) {
      const player: Player = filteredPlayer[0];
      const tempPlayers = [...players, player];

      const finsihPlayer = dataFinish.filter(
        (player) => player.finish === dummyTimer
      );

      if (finsihPlayer[0] !== undefined) {
        const player = finsihPlayer[0];
        setDummyState(player);
        const index = tempPlayers.findIndex((p) => p.id === player.id);

        if (index >= 0) {
          tempPlayers[index].finish = player.finish;
        }
        setPlayers(tempPlayers);
      } else {
        setPlayers(tempPlayers);
      }
    } else {
      const finsihPlayer = dataFinish.filter(
        (player) => player.finish === dummyTimer
      );

      if (finsihPlayer[0] !== undefined) {
        const player = finsihPlayer[0];
        setDummyState(player);
        const index = players.findIndex((p) => p.id === player.id);

        if (index >= 0) {
          players[index].finish = player.finish;
        }
        setPlayers(players);
      }
    }
  }, [dummyTimer, players]);

  useEffect(() => {
    if (finishSort) {
      setPlayers(
        // @ts-expect-error
        players.sort((a, b) => {
          if (a.finish && b.finish) {
            return a.finish - b.finish;
          }
        })
      );
    } else {
      setPlayers(
        // @ts-expect-error
        players.sort((a, b) => {
          if (a.time && b.time) {
            return a.time - b.time;
          }
        })
      );
    }
  }, [players, dummyState, finishSort]);

  useEffect(() => {
    let TimeId = setInterval(() => {
      if (timer <= TIMER_TIME) {
        const dt = timer + 0.01;
        setTimer(dt);
        setDummyTimer(Number(dt.toString().split(".")[0]));
      }
    }, 10);
    if (timer > TIMER_TIME) {
      clearInterval(TimeId);
    }
    return () => {
      clearInterval(TimeId);
    };
  }, [timer]);

  const reset = () => {
    players.forEach((p) => {
      p.finish = null;
    });
    setPlayers([]);
    setTimer(0);
    setDummyTimer(0);
    setFinishSort(true);
    setDummyState(123);
  };

  const handleFinishSort = () => {
    setFinishSort(false);
    setDummyState(456);
  };

  const handleCorridorSort = () => {
    setFinishSort(true);
    setDummyState(321);
  };

  return (
    <div className="App">
      <progress className="progress" value={timer} max={TIMER_TIME} />
      <div className="tableWrap">
        <div className="heroContent">
          <h1 className="heroText">Viveo Olympics</h1>
          <p className="timerText">{`${timer % 60}`.slice(0, 5)}</p>
          <button type="button" onClick={reset}>
            REPLAY
          </button>
        </div>
        {/* <p className="textNote">
          * Click on Corridor or Finish to sort accordingly
        </p> */}
      </div>
      <table className="playerTable">
        <tr className="player">
          <th>Pos</th>
          <th></th>

          <th>Name</th>
          <th className="column" onClick={handleCorridorSort}>
            Corridor
          </th>
          <th className="column" onClick={handleFinishSort}>
            Finish
          </th>
        </tr>
        <tbody>
          {/* @ts-ignore */}
          <FlipMove enterAnimation="fade" leaveAnimation="fade">
            {players.map((player, indx) => {
              return (
                <tr className="player" key={player.id}>
                  <td>{indx + 1}</td>
                  <td>
                    <img src={player.url} />
                  </td>
                  <td>{player.name}</td>
                  <td>{player.time}.00s</td>
                  <td>{player.finish ? `${player.finish}.00s` : "--"}</td>
                </tr>
              );
            })}
          </FlipMove>
        </tbody>
      </table>
    </div>
  );
};

export default Game;
