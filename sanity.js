import { createClient } from "@sanity/client";

const config = {
  name: "default",
  title: "KORE RPO",
  projectId: "f00j6j5u",
  dataset: "production",
  useCdn: false,
  apiVersion: "2021-08-31",
  api: {
    projectId: "f00j6j5u",
  },
};

export const client = createClient(config);
export default client;
