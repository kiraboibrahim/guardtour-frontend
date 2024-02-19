import React, { createContext, useContext, useEffect, useState } from "react";
import {
  Typography,
  TabList,
  Tab,
  TabPanel,
  Tabs,
  Box,
  CircularProgress,
  Breadcrumbs,
  Link,
} from "@mui/joy";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";

import siteService from "../../services/site";
import PatrolTable from "../PatrolTable/PatrolTable";
import TagTable from "../TagTable/TagTable";
import { ErrorContext } from "../Error/Error";

export const SiteContext = createContext();

function SelectSite() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <ApartmentOutlinedIcon sx={{ fontSize: 40, mb: 3 }} />
      <Typography level="h3" color="neutral">
        Select a site to veiw details
      </Typography>
    </Box>
  );
}

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        py: 3,
      }}
    >
      <CircularProgress size="sm" />
    </Box>
  );
}

export default function SiteDetail() {
  const TAGS_TAB = 0;
  const PATROLS_TAB = 2;
  const defaultTab = TAGS_TAB;

  const { selectedSite } = useContext(SiteContext);
  const { setError } = useContext(ErrorContext);
  const [tags, setTags] = useState([]);
  const [patrols, setPatrols] = useState([]);
  const [tagLoading, setTagLoading] = useState(false);
  const [patrolLoading, setPatrolLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(defaultTab);

  function getSiteDetails() {
    if (selectedSite) {
      switch (selectedTab) {
        case TAGS_TAB:
          setTagLoading(true);
          siteService
            .getSiteTags(selectedSite)
            .then((tags) => {
              setTags(tags);
            })
            .catch((reason) => setError(reason.message))
            .finally(() => setTagLoading(false));
          break;
        case PATROLS_TAB:
          setPatrolLoading(true);
          siteService
            .getSitePatrols(selectedSite)
            .then((patrols) => {
              setPatrols(patrols);
            })
            .catch((reason) => setError(reason.message))
            .finally(() => setPatrolLoading(false));
          break;
        default:
          return;
      }
    }
  }

  useEffect(() => {
    getSiteDetails();
  }, [selectedSite, selectedTab]);

  if (selectedSite) {
    return (
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", my: 3 }}>
          <Breadcrumbs
            size="sm"
            separator={<ChevronRightRoundedIcon fontSize="sm" />}
            sx={{ pl: 0 }}
          >
            <Link underline="none" color="neutral">
              <HomeRoundedIcon />
            </Link>
            <Typography color="primary" fontWeight={500} fontSize={12}>
              My sites
            </Typography>
            <Typography color="primary" fontWeight={500} fontSize={12}>
              {selectedSite.name}
            </Typography>
          </Breadcrumbs>
        </Box>
        <Typography level="h2" component="h1" sx={{ mb: 5 }}>
          {selectedSite.name}
        </Typography>
        <Tabs
          size="md"
          defaultValue={defaultTab}
          onChange={(event, value) => setSelectedTab(value)}
        >
          <TabList>
            <Tab value={TAGS_TAB}>Tags</Tab>
            <Tab value={PATROLS_TAB}>Patrols</Tab>
          </TabList>
          <TabPanel value={TAGS_TAB}>
            {!!tags.length && <TagTable tags={tags} />}
            {!tags.length && !tagLoading && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                No tags found
              </div>
            )}
            {tagLoading && <Loading />}
          </TabPanel>
          <TabPanel value={PATROLS_TAB}>
            {!!patrols.length && <PatrolTable patrols={patrols} />}
            {!patrols.length && !patrolLoading && (
              <div style={{ display: "flex", justifyContent: "center" }}>
                No patrols found
              </div>
            )}
            {patrolLoading && <Loading />}
          </TabPanel>
        </Tabs>
      </Box>
    );
  } else {
    return <SelectSite />;
  }
}
