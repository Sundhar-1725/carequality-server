
const orgXmltojson = (data) => {
  console.log(data?.Bundle?.entry?.length)
  const organizations = data?.Bundle?.entry?.map((entry) => {
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
      contactDetails: entry?.resource?.[0]?.Organization?.[0]?.contact?.map((contact) => ({
        purpose: contact?.purpose?.[0]?.coding?.[0]?.code?.[0]?.["$"]?.value,
        name: {
          use: contact?.name?.[0]?.use?.[0]?.["$"]?.value,
          text: contact?.name?.[0]?.text?.[0]?.["$"]?.value,
        },
        telecom: contact?.telecom?.map((t) => ({
          system: t?.system?.[0]?.["$"]?.value,
          value: t?.value?.[0]?.["$"]?.value,
        })),
      }))
    };
  });
  return organizations;
};

module.exports = {
  orgXmltojson,
};