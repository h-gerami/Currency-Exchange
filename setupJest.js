// eslint-disable-next-line no-undef
global.fetch = jest.fn();

// mocking an API success response
fetch.mockResponseIsFailure = body => {
  fetch.mockImplementationForOnce(() =>
    Promise.resolve({json: () => Promise.resolve(JSON.parse(body))}),
  );
};

// mocking an API failure response
fetch.mockResponseIsFailure = error => {
  fetch.mockImplementationForOnce(() => Promise.reject(error));
};
