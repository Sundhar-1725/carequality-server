
const orgXmltojson = (data) => {
  const organizations = data?.Bundle?.entry?.map((entry) => {
    const telecoms = entry?.resource?.[0]?.Organization?.[0]?.contact?.map((contact) => {
      // Sort telecom so that email comes first, then phone
      const sortedTelecom = (contact?.telecom || []).slice().sort((a, b) => {
        const getOrder = (t) => t?.system?.[0]?.["$"]?.value === "email" ? 0 : t?.system?.[0]?.["$"]?.value === "phone" ? 1 : 2;
        return getOrder(a) - getOrder(b);
      });
      return {
        purpose: contact?.purpose?.[0]?.coding?.[0]?.code?.[0]?.["$"]?.value,
        name: {
          use: contact?.name?.[0]?.use?.[0]?.["$"]?.value,
          text: contact?.name?.[0]?.text?.[0]?.["$"]?.value,
        },
        telecom: sortedTelecom.map((t) => ({
          system: t?.system?.[0]?.["$"]?.value,
          value: t?.value?.[0]?.["$"]?.value,
        })),
      };
    });

    return {
      fullUrl: entry?.fullUrl[0]?.["$"]?.value,
      id: entry?.resource?.[0]?.Organization?.[0]?.id?.[0]?.["$"]?.value,
      organizationName: entry?.resource?.[0]?.Organization?.[0]?.name?.[0]?.["$"]?.value,
      identifier: entry?.resource?.[0]?.Organization?.[0]?.identifier?.map((id) => ({
        use: id?.use?.[0]?.["$"]?.value,
        system: id?.system?.[0]?.["$"]?.value,
        value: id?.value?.[0]?.["$"]?.value,
      })),
      Location: entry?.resource?.[0]?.Organization?.[0]?.contained
        ?.filter((cont) => cont?.Location)
        ?.map((cont) => {
          const loc = cont.Location[0];
          return {
            longitude: loc?.position?.[0]?.longitude?.[0]?.["$"]?.value,
            latitude: loc?.position?.[0]?.latitude?.[0]?.["$"]?.value,
          };
        }),
      addressDetails: {
        line: entry?.resource?.[0]?.Organization?.[0]?.address?.[0]?.line?.[0]?.["$"]?.value,
        city: entry?.resource?.[0]?.Organization?.[0]?.address?.[0]?.city?.[0]?.["$"]?.value,
        state: entry?.resource?.[0]?.Organization?.[0]?.address?.[0]?.state?.[0]?.["$"]?.value,
        postalCode: entry?.resource?.[0]?.Organization?.[0]?.address?.[0]?.postalCode?.[0]?.["$"]?.value,
        country: entry?.resource?.[0]?.Organization?.[0]?.address?.[0]?.country?.[0]?.["$"]?.value,
      },
      contactDetails: telecoms
    };
  });
  return { status: "success", totalCount: data?.Bundle?.entry?.length, data: organizations };
};

const orgXmltojson1 = (data) => {
  const organizations = data?.Bundle?.entry?.map((entry) => {
    const telecoms = entry?.resource?.[0]?.Organization?.[0]?.contact?.map((contact) => {
      // Sort telecom so that email comes first, then phone
      const sortedTelecom = (contact?.telecom || []).slice().sort((a, b) => {
        const getOrder = (t) => t?.system?.[0]?.["$"]?.value === "email" ? 0 : t?.system?.[0]?.["$"]?.value === "phone" ? 1 : 2;
        return getOrder(a) - getOrder(b);
      });
      return {
        purpose: contact?.purpose?.[0]?.coding?.[0]?.code?.[0]?.["$"]?.value,
        name: {
          use: contact?.name?.[0]?.use?.[0]?.["$"]?.value,
          text: contact?.name?.[0]?.text?.[0]?.["$"]?.value,
        },
        telecom: sortedTelecom.map((t) => ({
          system: t?.system?.[0]?.["$"]?.value,
          value: t?.value?.[0]?.["$"]?.value,
        })),
      };
    });

    return {
      fullUrl: entry?.fullUrl[0]?.["$"]?.value,
      id: entry?.resource?.[0]?.Organization?.[0]?.id?.[0]?.["$"]?.value,
      organizationName: entry?.resource?.[0]?.Organization?.[0]?.name?.[0]?.["$"]?.value,
      identifier: entry?.resource?.[0]?.Organization?.[0]?.identifier?.map((id) => ({
        use: id?.use?.[0]?.["$"]?.value,
        system: id?.system?.[0]?.["$"]?.value,
        value: id?.value?.[0]?.["$"]?.value,
      })),
      Location: entry?.resource?.[0]?.Organization?.[0]?.contained
        ?.filter((cont) => cont?.Location)
        ?.map((cont) => {
          const loc = cont.Location[0];
          return {
            longitude: loc?.position?.[0]?.longitude?.[0]?.["$"]?.value,
            latitude: loc?.position?.[0]?.latitude?.[0]?.["$"]?.value,
          };
        }),
      addressDetails: {
        line: entry?.resource?.[0]?.Organization?.[0]?.address?.[0]?.line?.[0]?.["$"]?.value,
        city: entry?.resource?.[0]?.Organization?.[0]?.address?.[0]?.city?.[0]?.["$"]?.value,
        state: entry?.resource?.[0]?.Organization?.[0]?.address?.[0]?.state?.[0]?.["$"]?.value,
        postalCode: entry?.resource?.[0]?.Organization?.[0]?.address?.[0]?.postalCode?.[0]?.["$"]?.value,
        country: entry?.resource?.[0]?.Organization?.[0]?.address?.[0]?.country?.[0]?.["$"]?.value,
      },
      contactDetails: telecoms
    };
  });
  return organizations;
};

const orgXmltojson2 = (data) => {
  // Handle single object instead of array
  const entry = data;

  const telecoms = entry?.resource?.[0]?.Organization?.[0]?.contact?.map((contact) => {
    // Sort telecom so that email comes first, then phone
    const sortedTelecom = (contact?.telecom || []).slice().sort((a, b) => {
      const getOrder = (t) => t?.system?.[0]?.["$"]?.value === "email" ? 0 : t?.system?.[0]?.["$"]?.value === "phone" ? 1 : 2;
      return getOrder(a) - getOrder(b);
    });
    return {
      purpose: contact?.purpose?.[0]?.coding?.[0]?.code?.[0]?.["$"]?.value,
      name: {
        use: contact?.name?.[0]?.use?.[0]?.["$"]?.value,
        text: contact?.name?.[0]?.text?.[0]?.["$"]?.value,
      },
      telecom: sortedTelecom.map((t) => ({
        system: t?.system?.[0]?.["$"]?.value,
        value: t?.value?.[0]?.["$"]?.value,
      })),
    };
  });

  return {
    fullUrl: entry?.fullUrl[0]?.["$"]?.value,
    id: entry?.resource?.[0]?.Organization?.[0]?.id?.[0]?.["$"]?.value,
    organizationName: entry?.resource?.[0]?.Organization?.[0]?.name?.[0]?.["$"]?.value,
    identifier: entry?.resource?.[0]?.Organization?.[0]?.identifier?.map((id) => ({
      use: id?.use?.[0]?.["$"]?.value,
      system: id?.system?.[0]?.["$"]?.value,
      value: id?.value?.[0]?.["$"]?.value,
    })),
    Location: entry?.resource?.[0]?.Organization?.[0]?.contained
      ?.filter((cont) => cont?.Location)
      ?.map((cont) => {
        const loc = cont.Location[0];
        return {
          longitude: loc?.position?.[0]?.longitude?.[0]?.["$"]?.value,
          latitude: loc?.position?.[0]?.latitude?.[0]?.["$"]?.value,
        };
      }),
    addressDetails: {
      line: entry?.resource?.[0]?.Organization?.[0]?.address?.[0]?.line?.[0]?.["$"]?.value,
      city: entry?.resource?.[0]?.Organization?.[0]?.address?.[0]?.city?.[0]?.["$"]?.value,
      state: entry?.resource?.[0]?.Organization?.[0]?.address?.[0]?.state?.[0]?.["$"]?.value,
      postalCode: entry?.resource?.[0]?.Organization?.[0]?.address?.[0]?.postalCode?.[0]?.["$"]?.value,
      country: entry?.resource?.[0]?.Organization?.[0]?.address?.[0]?.country?.[0]?.["$"]?.value,
    },
    contactDetails: telecoms
  };
};

const data_Updatate = (dbEntry, extEntry) => {
  // Helper function to deeply compare two objects
  
  // Add null/undefined checks before processing
  if (!dbEntry || !extEntry) {
    return 2; // Return extEntry preference if data is missing
  }
  
  // Additional checks for nested structure
  if (!dbEntry.resource || !Array.isArray(dbEntry.resource) || dbEntry.resource.length === 0) {
    return 2;
  }
  
  if (!extEntry.resource || !Array.isArray(extEntry.resource) || extEntry.resource.length === 0) {
    return 2;
  }
  
  const deepEqual = (obj1, obj2) => {
    if (obj1 === obj2) return true;
    if (obj1 == null || obj2 == null) return false;
    if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return obj1 === obj2;

    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      if (!keys2.includes(key)) return false;
      if (!deepEqual(obj1[key], obj2[key])) return false;
    }

    return true;
  };

  try {
    // Compare the relevant fields between dbEntry and extEntry
    const dbData = orgXmltojson2(dbEntry);
    const extData = orgXmltojson2(extEntry);

    // If values are different, return extEntry, otherwise return dbEntry
    return deepEqual(dbData, extData) ? 1 : 2;
  } catch (error) {
    console.log("Error in data comparison:", error.message);
    return 2; // Return extEntry preference if comparison fails
  }
}
const updateExternalOrgDataHelper = (DB_data, external_data) => {
  console.log("Enter updateExternalOrgDataHelper");

  // Convert both datasets to consistent JSON structures first
  const externalOrgs = orgXmltojson1(external_data);

  // Prepare a flat array for results
  const updatedData = [];
  
  DB_data.forEach((dbEntry) => {
    const dbParsed = orgXmltojson2(dbEntry.data.entry || dbEntry.data[0]?.entry || dbEntry.data); // handle nested XML parsed structure

    // Find match in external data by ID
    const matchedExt = externalOrgs.find(
      (ext) => ext.id === dbParsed.id
    );

    if (matchedExt) {
      // Compare and pick which to keep
      const compareResult = data_Updatate(dbEntry.data.entry?.[0] || dbEntry.data, matchedExt);
      updatedData.push(compareResult === 2 ? matchedExt : dbParsed);
    } else {
      // No external match → keep DB entry
      updatedData.push(dbParsed);
    }
  });

  // Also add new organizations from external_data not in DB
  const dbIds = DB_data.map((d) => orgXmltojson2(d.data.entry || d.data)?.id);
  const newExternalOnly = externalOrgs.filter((ext) => !dbIds.includes(ext.id));
  updatedData.push(...newExternalOnly);

  console.log("Merged total organizations:", updatedData.length);
  return updatedData;
};


module.exports = {
  orgXmltojson,
  updateExternalOrgDataHelper
};