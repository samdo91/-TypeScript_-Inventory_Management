import React, { useState, useEffect } from "react";

type ClockProps = {
  setDate?: React.Dispatch<React.SetStateAction<Date>>;
};

function Clock({ setDate }: ClockProps) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
      if (setDate) {
        setDate(new Date());
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [setDate]);

  const year = time.getFullYear().toString().padStart(4, "0");
  const month = (time.getMonth() + 1).toString().padStart(2, "0");
  const day = time.getDate().toString().padStart(2, "0");
  const hour = time.getHours().toString().padStart(2, "0");
  const minute = time.getMinutes().toString().padStart(2, "0");

  const formattedTime = `${year}/${month}/${day}/${hour}/${minute}`;

  return (
    <div>
      <div>{formattedTime}</div>
    </div>
  );
}

export default Clock;
