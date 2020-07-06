import React from 'react';

// ** 
/**
 * Creates a list item for each validation error received from the api
 ** made this accessible by adding a role for to the error container
 ** and by associating each error with its corresponding
 ** input by adding aria-describedby to the input. Clicking on an error
 ** will put focus on the input and scroll to it on the page
 * adapted from https://www.w3.org/WAI/tutorials/forms/notifications/#listing-errors
 */
export default function ErrorsDisplay(props) {
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