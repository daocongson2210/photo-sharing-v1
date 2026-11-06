/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 * @returns {Promise}       A Promise resolving to { data: responseData }
 */
function fetchModel(url) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url);

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return;
      }

      if (xhr.status === 200) {
        try {
          const parsedData = JSON.parse(xhr.responseText);
          resolve({ data: parsedData });
        } catch (e) {
          reject(new Error("Failed to parse JSON response: " + e.message));
        }
      } else {
        const error = new Error(xhr.statusText || `HTTP error ${xhr.status}`);
        error.status = xhr.status;
        error.statusText = xhr.statusText;
        reject(error);
      }
    };

    xhr.onerror = function () {
      const error = new Error(xhr.statusText || "Network request failed");
      error.status = xhr.status;
      error.statusText = xhr.statusText;
      reject(error);
    };

    xhr.send();
  });
}

export default fetchModel;
