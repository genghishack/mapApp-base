export const onError = (error) => {
  console.log(error);
  let message = error.toString();

  // Errors w/ API response body
  if (error.response) {
    if (error.response.data && error.response.data.message) {
      message = error.response.data.message;
    }
  }

  // Auth errors
  if (!(error instanceof Error) && error.message) {
    message = error.message;
  }

  alert(`${message}`);
}
