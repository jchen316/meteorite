import TextTyper from "../TextTyper.tsx/TextTyper";
import useFetch from "../../hooks/useFetch";
import useUrlFlag from "../../hooks/useUrlFlag";

function CTF() {
  const { urlFlag } = useUrlFlag();
  const { flag, loading, error } = useFetch(urlFlag);

  return (
    <div className="App">
      <h1>CTF Challenge</h1>
      {error && <div>Error...</div>}
      {loading && <div>Loading...</div>}
      <TextTyper text={flag} interval={500} />
    </div>
  );
}

export default CTF;
