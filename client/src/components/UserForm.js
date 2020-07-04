import React, { useRef, useEffect } from 'react';

const UserForm = React.forwardRef((props, ref) => {
  const {
    cancel,
    errors,
    submit,
    submitButtonText,
    elements,
  } = props;

  // refs to mark locations on page to scroll to
  const validationRef = useRef(null);

  useEffect(() => {
    // scroll to validation errors
    if (validationRef.current) {
      console.log(validationRef)
      validationRef.current.scrollIntoView({
        behavior: 'smooth'
      });
    }
  })

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <>
      <ErrorsDisplay
        errors={errors}
        validationRef={validationRef}
        // emailRef={emailRef}
        // passwordRef={passwordRef}
      />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="container-buttons">
          <button type="submit">{submitButtonText}</button>
          <button className="button-nav" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
});

/* Displays validation errors returned from API */
function ErrorsDisplay(props) {
  let errorsDisplay = null;
  const { errors } = props;

  if (errors.length) {
    errorsDisplay = (
      <div className="container-error" role="alert">
        <h2 ref={props.validationRef}>Validation errors</h2>
        <ul>
          {errors.map((error, i) => (
            <li key={i}>
              <button 
                id={`${error.field}_error`}
                className="error-link"
                onClick={() => {
                  const domRef = props[`${error.field}Ref`]
                  domRef.current.focus(); // will place focus on field with error
                  domRef.current.scrollIntoView({
                    behavior: 'smooth',
                    inline: 'end'
                  }); // scrolls page smoothly to field with error
                }}>
                {error.message}
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return errorsDisplay;
}


export default UserForm;