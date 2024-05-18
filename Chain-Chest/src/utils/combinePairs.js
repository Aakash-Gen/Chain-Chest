export function combinePairs(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i += 4) {
        if (i + 1 < arr.length) {
            result.push(arr[i] + arr[i + 1]);
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}

export function fileName(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i += 4) {
        if (i + 2 < arr.length) {
            result.push(arr[i + 2]);
        }
    }
    return result;
}

export function docType(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i += 4) {
        if (i + 3 < arr.length) {
            result.push(arr[i + 3]);
        }
    }
    return result;
}

export function mapDocuments(arr) {
    let ipfsHashes = combinePairs(arr);
    let filenames = fileName(arr);
    let doctypes = docType(arr);
    let documents = [];

    for (let i = 0; i < ipfsHashes.length; i++) {
        documents.push({
            ipfsHash: ipfsHashes[i],
            filename: filenames[i] || null, // Handle cases where filename might not exist
            doctype: doctypes[i] || null    // Handle cases where doctype might not exist
        });
    }

    return documents;
}