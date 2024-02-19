import axios from "axios";
import { SITES_URL } from "./config";

class SiteService {
  async getMySites() {
    const { data: sites } = (await axios.get(SITES_URL)).data;
    return sites;
  }

  async getSiteTags(site) {
    const { data } = await axios.get(`${SITES_URL}/${site.id}`);
    return data.tags;
  }

  async getSitePatrols(site) {
    const { data } = await axios.get(`${SITES_URL}/${site.id}/patrols`);
    return data.data;
  }
}

const siteService = new SiteService();
export default siteService;
