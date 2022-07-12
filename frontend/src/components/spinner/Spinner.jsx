import "./spinner.css";
import loadingAnim from "./loader/loader.gif"
function Spinner() {
  return (
    <>
      <div className='loader-wrapper'>
        <img className='load-anim' src={loadingAnim} alt='' draggable={false}/>
    </div>
    </>
  );
}
export default Spinner;