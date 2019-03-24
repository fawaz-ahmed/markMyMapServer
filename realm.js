const Realm = require('realm');
const realmFile = './db/db.realm';

const markerSchema = {
  name: 'Marker',
  properties: {
    uuid: { type:'string', indexed: true },
    latitude: 'double',
    longitude: 'double',
    name: 'string',
    address: 'string?',
  },
};

const realm = new Realm({
  schema: [markerSchema],
  path: realmFile,
  inMemory: false,
});


function saveMarker(marker) {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        realm.create(markerSchema.name, {
          ...marker
        });
        resolve(marker);
      });
    } catch(e) {
      reject(e);
      console.log('error db', e);
    }
  });
}

function updateMarker(uuid, marker) {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        realm.create(markerSchema.name, { ...marker, uuid }, true);
        resolve(marker);
      });
    } catch(e) {
      reject(e);
      console.log('error db', e);
    }
  });
}

function deleteMarker(uuid) {
  return new Promise((resolve, reject) => {
    try {
      realm.write(() => {
        let allMarkers = realm.objects(markerSchema.name);
        const requiredMarker = allMarkers.filtered(`uuid = "${uuid}"`);
        realm.delete(requiredMarker);
        resolve();
      });
    } catch(e) {
      reject(e);
      console.log('error db', e);
    }
  });
}

function getAllMarkers() {
  try {
    let markers = realm.objects(markerSchema.name);
    const result = {};
    for(const key in markers) {
      const marker = markers[key];
      result[marker.uuid] = marker;
    }
    console.log('markers', result);
    return result;
  } catch(e) {
    console.log('error db', e);
    return false;
  }
}

module.exports = {
  getAllMarkers,
  saveMarker,
  updateMarker,
  deleteMarker,
};
