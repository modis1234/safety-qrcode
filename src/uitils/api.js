import axios from 'axios';

const SERVER = 'http://localhost:3001';

export async function getBridges() {
    const response = await axios.get(
      `${SERVER}/bridge/bridges`
    );

    return response.data;
}

export async function getBridge(id) {
    const response = await axios.get(
        `${SERVER}/bridge/bridges/${id}`
    );
    return response.data;
}

export async function postBridge(postData) {
    // const response = await axios.post(
    //     `${SERVER}/bridge/bridges`,
    //     postData
    // );
    // return response.data;
    console.log('--->',postData)
    return postData
}

export async function putBridge(putData, id) {
    const response = await axios.put(
        `${SERVER}/bridge/bridges/${id}`,
        putData
    );
    return response.data;
}

export async function deleteBridge(id) {
    const response = await axios.put(
        `${SERVER}/bridge/bridges/${id}`
    );
    return response.data;
}