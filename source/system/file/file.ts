/**
 * Requests a file from the site synchronously, blocking execution until the file has been retrieved
 * @param {string} filePath - Filename and path of the file to retrieve
 * @param {string} [mimeType] - Override for the XMLHttpRequest mime type
 * @return {[boolean, string]} Tuple containing boolean (success|failure) and the file response text as a string
 */
export function requestFileBlocking(filePath: string, mimeType?: string): [boolean, string] {
   // Create a new XML Http request
   let request = new XMLHttpRequest();
 
   // If a mime-type was provided, then override the default
   if (mimeType != undefined) {
     request.overrideMimeType(mimeType);
   }
 
   // Finalize and send the request
   request.open("GET", filePath, false);
   request.send();
 
   // Return the response text
   return [request.readyState === XMLHttpRequest.DONE, request.responseText];
 }