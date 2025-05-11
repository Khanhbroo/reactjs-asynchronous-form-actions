import { useActionState } from "react";

const shareOpinionAction = (prevFormState, formData) => {
  const userData = Object.fromEntries(formData.entries());

  const errors = [];

  if (userData.userName === "") {
    errors.push("Please provide your name.");
  }
  if (userData.title.trim().length < 5) {
    errors.push("Title must be at least 5 characters long.");
  }
  if (userData.body.trim().length < 10 || userData.body.trim().length > 300) {
    errors.push("Opinion must be between 10 and 300 characters long.");
  }

  if (errors.length > 0) {
    return { errors, enteredValue: userData };
  }

  return { errors: null };
};

export function NewOpinion() {
  const [formState, formAction] = useActionState(shareOpinionAction, {
    errors: null,
  });

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input
              type="text"
              id="userName"
              name="userName"
              defaultValue={formState.enteredValue?.userName}
            />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              defaultValue={formState.enteredValue?.title}
            />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea
            id="body"
            name="body"
            rows={5}
            defaultValue={formState.enteredValue?.body}
          ></textarea>
        </p>

        {formState.errors && (
          <ul className="errors">
            {formState.errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        )}

        <p className="actions">
          <button type="submit">Submit</button>
        </p>
      </form>
    </div>
  );
}
