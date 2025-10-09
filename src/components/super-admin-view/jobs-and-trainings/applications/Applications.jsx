import { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import ApplicationsTab from "./ApplicationsTab";
import {
  getJobById,
  getTrainingById,
} from "@/api/super-admin/jobsAndTrainings";

const Applications = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");
  const [title, setTitle] = useState("All applications");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) {
        setLoading(false);
        return;
      }

      try {
        const apiCall = type === "training" ? getTrainingById : getJobById;
        const response = await apiCall({ id });

        if (response.data?.status) {
          const data = response.data.data?.training || response.data.data?.job;
          const jobTitle = data?.title || data?.position || "N/A";
          const companyName =
            data?.company ||
            data?.postedBy?.companyName ||
            data?.companyName ||
            "N/A";

          setTitle(`All applications for ${jobTitle} at ${companyName}`);
        }
      } catch (error) {
        console.error("Error fetching job/training details:", error);
        setTitle("All applications");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, type]);

  return (
    <div className="w-full space-y-6">
      <ApplicationsTab
        title={loading ? "Loading..." : title}
        isBackBtnEnabled
      />
    </div>
  );
};

export default Applications;
