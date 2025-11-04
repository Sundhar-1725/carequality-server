
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
  return { status: "success", totalCount : data?.Bundle?.entry?.length, data: organizations };
};

const separateXmlEntries = (xmlData) => {
  // This function can be implemented to separate XML entries if needed
  
};

const updateExternalOrgData = (DB_data, external_data) => {
  // This function can be implemented to update external organization data
  let updatedData = [];
  // Example logic to merge DB_data with external_data
  // This is a placeholder and should be replaced with actual merging logic
  updatedData = DB_data.map(dbEntry => {
    // Find matching entry in external_data
    const match = external_data.Bundle.entry.find(extEntry => 
      extEntry.resource[0].Organization[0].id[0]["$"].value === dbEntry.id
    );
    return match ? { ...dbEntry, externalInfo: match } : dbEntry;
  });
  return updatedData;
};

module.exports = {
  orgXmltojson,
  separateXmlEntries,
  updateExternalOrgData
};