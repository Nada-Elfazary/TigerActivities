import e from 'cors';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

function ToggleButtonGroupUncontrolled(props) {
    console.log("props in toggle: ", props)
  return (
    <>
      <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
        <ToggleButton id="tbg-radio-1" value={1} onClick = {props.activitiesFn}>
          Explore Activities
        </ToggleButton>
        <ToggleButton id="tbg-radio-2" value={2} onClick = {props.myActivitiesFn}>
          My Activities
        </ToggleButton>
        <ToggleButton id="tbg-radio-3" value={3} onClick = {props.mySignUpsFn}>
          My Sign-Ups
        </ToggleButton>
        <ToggleButton id="tbg-radio-4" value={4}  onClick = {props.profileFn}>
          Profile
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

export default ToggleButtonGroupUncontrolled;