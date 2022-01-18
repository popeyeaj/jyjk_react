import { Helmet } from 'react-helmet';
import { Inspector } from 'react-dev-inspector';

const InspectorWrapper =
  process.env.NODE_ENV === 'development' ? Inspector : React.Fragment;

const Layout = (props) => {
  const { children } = props;
  return (
    <InspectorWrapper>
      <Helmet
        encodeSpecialCharacters={true}
        titleTemplate="%s - seeutopia.com"
        defaultTitle="seeutopia.com"
      >
        {/* <title>{title}</title> */}
        <meta name="description" />
      </Helmet>
      {children}
    </InspectorWrapper>
  );
};

export default Layout;
