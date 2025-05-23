import { Route, Routes } from "react-router-dom";
import Layout from "./components/recruiter-view/layout";
import ProfileSetupLayout from "./components/recruiter-view/profile-setup-layout";
import JobOpenings from "./pages/recruiter-view/job-openings";
import Candidates from "./pages/recruiter-view/candidates";
import CandidateCreate from "./pages/recruiter-view/candidate-create";
import MatchesAndSubmission from "./pages/recruiter-view/matches-and-submission";
import BasicDetails from "./pages/recruiter-view/basic-details";
import KycVerification from "./pages/recruiter-view/kyc-verification";
import SectoralDetails from "./pages/recruiter-view/sectoral-details";
import QualificationDetails from "./pages/recruiter-view/qualification-details";
import useAuthStore from "./stores/useAuthStore";
import ScrollToTop from "./components/common/scrollToTop";
import CheckAuth from "./components/common/checkAuth";
import CandidateReleventDetails from "./pages/recruiter-view/candidate-releventDetails";
import RecruiterLogin from "./pages/recruiter-view/log-in";
import CorporateLogIn from "./pages/corporate-view/log-in";
import RecruiterDashboard from "./pages/recruiter-view/dashboard";
import CorporateDashboard from "./pages/corporate-view/dashboard";
import { useGetUserProfile as useGetRecruiterUserProfile } from "./hooks/recruiter/useProfile";
import { useGetCorporateUserProfile } from "./hooks/corporate/useProfile";
import CorporateBasicDetails from "./pages/corporate-view/basic-details";
import DynamicCheckAuthWrapper from "./components/common/dynamicCheckAuthWrapper";
import FinalSetup from "./pages/corporate-view/final-setup";
import Analytics from "./pages/corporate-view/analytics";
import Listing from "./pages/corporate-view/listing";

function App() {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  if (token) {
    useAuthStore.getState().setToken(token, !!localStorage.getItem("token"));
    useAuthStore.getState().setIsAuthenticated(true);
  }

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <CheckAuth
              fetchProfileHook={useGetRecruiterUserProfile}
              allowedRoles={["recruiter", "corporate"]}
            >
              <CorporateDashboard />
            </CheckAuth>
          }
        />
        <Route element={<ProfileSetupLayout />}>
          <Route path="congratulation" element={<DynamicCheckAuthWrapper />} />
        </Route>
        <Route
          path="/recruiter/profile-setup"
          element={
            <CheckAuth
              fetchProfileHook={useGetRecruiterUserProfile}
              allowedRoles={["recruiter"]}
            >
              <ProfileSetupLayout />
            </CheckAuth>
          }
        >
          <Route path="basic-details" element={<BasicDetails />} />
          <Route path="kyc-verification" element={<KycVerification />} />
          <Route path="sectoral-details" element={<SectoralDetails />} />
          <Route
            path="qualification-details"
            element={<QualificationDetails />}
          />
        </Route>
        <Route
          path="/recruiter"
          element={
            <CheckAuth
              fetchProfileHook={useGetRecruiterUserProfile}
              allowedRoles={["recruiter"]}
            >
              <Layout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<RecruiterDashboard />} />
          <Route path="candidates" element={<Candidates />} />
          <Route
            path="candidates/candidate-create"
            element={<CandidateCreate />}
          />
          <Route
            path="candidates/relevent-details"
            element={<CandidateReleventDetails />}
          />

          <Route path="job-openings" element={<JobOpenings />} />
          <Route
            path="matches-and-submissions"
            element={<MatchesAndSubmission />}
          />
        </Route>
        <Route
          path="/recruiter"
          element={
            <CheckAuth
              fetchProfileHook={useGetRecruiterUserProfile}
              allowedRoles={["recruiter"]}
            >
              <ProfileSetupLayout />
            </CheckAuth>
          }
        >
          <Route path="log-in" element={<RecruiterLogin />} />
        </Route>
        <Route
          path="/corporate/profile-setup"
          element={
            <CheckAuth
              fetchProfileHook={useGetCorporateUserProfile}
              allowedRoles={["corporate"]}
            >
              <ProfileSetupLayout />
            </CheckAuth>
          }
        >
          <Route path="basic-details" element={<CorporateBasicDetails />} />
        </Route>
        <Route
          path="/corporate"
          element={
            <CheckAuth
              fetchProfileHook={useGetCorporateUserProfile}
              allowedRoles={["corporate"]}
            >
              <ProfileSetupLayout />
            </CheckAuth>
          }
        >
          <Route path="log-in" element={<CorporateLogIn />} />
        </Route>
        <Route
          path="/corporate"
          element={
            <CheckAuth
              fetchProfileHook={useGetCorporateUserProfile}
              allowedRoles={["corporate"]}
            >
              <Layout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<CorporateDashboard />} />
          <Route path="job-posting/analytics" element={<Analytics />} />
          <Route path="job-posting/listing" element={<Listing />} />
        </Route>
        <Route
          path="/corporate/profile-setup"
          element={
            <CheckAuth
              fetchProfileHook={useGetCorporateUserProfile}
              allowedRoles={["corporate"]}
            >
              <ProfileSetupLayout />
            </CheckAuth>
          }
        >
          <Route path="final-setup" element={<FinalSetup />} />
        </Route>
        {/* <Route
          path="*"
          element={
            <CheckAuth
              fetchProfileHook={useGetRecruiterUserProfile}
              allowedRoles={["recuiter"]}
            >
              <CorporateDashboard />
            </CheckAuth>
          }
        /> */}
      </Routes>
    </div>
  );
}

export default App;
