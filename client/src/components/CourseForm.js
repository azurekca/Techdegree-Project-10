import React, { useRef } from 'react';
import ToolTip from './helpers/ToolTip'

export default (props) => {
  const {
    change,
    cancel,
    errors,
    submit,
    submitButtonText,
    title,
    description,
    estimatedTime,
    materialsNeeded,
  } = props;

  const titleRef = useRef(null);
  const descriptionRef = useRef(null);

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
        titleRef={titleRef}
        descriptionRef={descriptionRef}
      />
      <form className="container-grid-course" onSubmit={handleSubmit}>
        <div className="course-title container-form-course">
          <label htmlFor="title">Title</label>
          <input 
            id="title" 
            name="title" 
            ref={titleRef}
            type="text"
            value={title}
            aria-required="true"
            aria-describedby="title_error"
            onChange={event => change(event)} 
            placeholder="Course title"
            autoFocus />
        </div>
        <div className="course-description container-form-course">
          <label htmlFor="description">Description</label>
          <ToolTip message="Description text area accepts simple markdown" />
          <textarea 
            id="description" 
            name="description" 
            ref={descriptionRef}
            value={description}
            aria-required="true"
            aria-describedby="description_error"
            onChange={event => change(event)} 
            placeholder="Course description..." />
        </div>
        <div className="course-time container-form-course">
          <label htmlFor="estimatedTime">Estimated Time</label>
          <input 
            id="estimatedTime" 
            name="estimatedTime" 
            type="text"
            value={estimatedTime} 
            onChange={event => change(event)} 
            placeholder="Estimated time" />
        </div>
        <div className="course-materials container-form-course">
          <label htmlFor="materialsNeeded">Materials Needed</label>
          <ToolTip message="Text area accepts simple markdown" />
          <textarea 
            id="materialsNeeded" 
            name="materialsNeeded"
            value={materialsNeeded} 
            onChange={event => change(event)} 
            placeholder="Materials needed..." />
        </div>
        <div className="container-buttons">
          <button type="submit">{submitButtonText}</button>
          <button className="button-nav" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </>
  );
}

// ** 
/**
 * Creates a list item for each validation error received from the api
 ** made this accessible by adding a role for to the error container
 ** and by associating each error with its corresponding
 ** input by adding aria-describedby to the input. Clicking on an error
 ** will put focus on the input and scroll to it on the page
 * adapted from https://www.w3.org/WAI/tutorials/forms/notifications/#listing-errors
 */
function ErrorsDisplay(props) {
  let errorsDisplay = null;
  const { errors } = props;

  if (errors.length) {
    errorsDisplay = (
      <div role="alert">
        <h2 className="validation--errors--label">Validation errors</h2>
        <ul>
          {errors.map((error, i) => (
            <li key={i}>
              <button 
                id={`${error.field}_error`}
                className="validation--errors--button"
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
