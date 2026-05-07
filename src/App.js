import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navbar       from "./components/Navbar";
import Home         from "./pages/Home";
import About        from "./pages/About";
import Publications from "./pages/Publications";
import Essays       from "./pages/Essays";
import EssayDetail  from "./pages/EssayDetail";
import Contact      from "./pages/Contact";
import AdminLogin   from "./pages/admin/AdminLogin";
import AdminLayout  from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import { AdminEssaysList, AdminEssayNew, AdminEssayEdit } from "./pages/admin/AdminEssays";
import { AdminPublicationsList, AdminPublicationNew, AdminPublicationEdit } from "./pages/admin/AdminPublications";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function PublicLayout({ children }) {
  return <><Navbar />{children}</>;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/"             element={<PublicLayout><Home /></PublicLayout>} />
        <Route path="/about"        element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/publications" element={<PublicLayout><Publications /></PublicLayout>} />
        <Route path="/essays"       element={<PublicLayout><Essays /></PublicLayout>} />
        <Route path="/essays/:slug" element={<PublicLayout><EssayDetail /></PublicLayout>} />
        <Route path="/contact"      element={<PublicLayout><Contact /></PublicLayout>} />
        <Route path="/admin"        element={<AdminLogin />} />
        <Route path="/admin"        element={<AdminLayout />}>
          <Route path="dashboard"             element={<AdminDashboard />} />
          <Route path="essays"                element={<AdminEssaysList />} />
          <Route path="essays/new"            element={<AdminEssayNew />} />
          <Route path="essays/edit/:id"       element={<AdminEssayEdit />} />
          <Route path="publications"          element={<AdminPublicationsList />} />
          <Route path="publications/new"      element={<AdminPublicationNew />} />
          <Route path="publications/edit/:id" element={<AdminPublicationEdit />} />
        </Route>
        <Route path="*" element={<PublicLayout><Home /></PublicLayout>} />
      </Routes>
    </BrowserRouter>
  );
}
