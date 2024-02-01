import { FC } from "react";
import styles from "./Timer.module.scss";
import useCountdownTimer from "./useCountdownTimer";

interface TimerProps {
  endTime: number;
}

const Timer: FC<TimerProps> = (props) => {
  const { endTime } = props;
  const countTime = useCountdownTimer(endTime);
  return <div className={styles.count}>{countTime}</div>;
};

export default Timer;
