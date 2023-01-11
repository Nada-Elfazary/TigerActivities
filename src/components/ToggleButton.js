import e from 'cors';
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

function ToggleButtonGroupUncontrolled(props) {
    console.log("props in toggle: ", props)
  return (
    <>
      <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
        <ToggleButton id="explore" value={1} onClick = {props.activitiesFn}>
          Explore Activities
        </ToggleButton>
        <ToggleButton id="manage" value={2} onClick = {props.myActivitiesFn}>
          My Activities
        </ToggleButton>
        <ToggleButton id="signups" value={3} onClick = {props.mySignUpsFn}>
          My Sign-Ups
        </ToggleButton>
        <ToggleButton id="profile" value={4}  onClick = {props.profileFn}>
          Profile
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

export default ToggleButtonGroupUncontrolled;