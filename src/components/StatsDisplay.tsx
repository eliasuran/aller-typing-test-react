export default function StatsDisplay(props: {
  user: string;
  wpm: number;
  time: number;
}) {
  return (
    <div className='flex w-full justify-around'>
      <div>
        <span className='font-bold'>{props.user}</span> is currently typing
      </div>
      <h1>{props.wpm} words per minute</h1>
      <h1>{props.time} seconds</h1>
    </div>
  );
}
