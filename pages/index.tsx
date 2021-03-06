import Layout from "../components/Layout";
import {ReactElement} from "react";
import PowderDayApp from "../components/PowderDayApp/PowderDayApp";

const IndexPage = (): ReactElement => (
  <Layout title="Powderday">
    <PowderDayApp/>
  </Layout>
);

export default IndexPage;
