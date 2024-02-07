const requestURL = "https://fakerapi.it/api/v1/persons?_quantity=20";

const formatAddress = (user: any) => {
  return `${user.street}, ${user.streetName}, ${user.buildingNumber}, ${user.city}, ${user.country}, ${user.zipcode}`;
};

const formatValue = (key: string, value: any, user) => {
  switch (key) {
    case "address":
      return formatAddress(value);
    case "image":
      // The image service stopped so we overwrite it
      return `https://robohash.org/${user.firstname}_${user.lastname}`;
    default:
      return value;
  }
};

export default defineEventHandler(async (event) => {
  const { data } = await fetch(requestURL).then((response) => response.json());

  return {
    users: data.map((user: any) => {
      return Object.entries(user).reduce((acc, [key, value]) => {
        return {
          ...acc,
          [key]: formatValue(key, value, user),
        };
      }, {});
    }),
    requestURL,
  };
});
