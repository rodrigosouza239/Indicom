import { Dimensions } from 'react-native';

const styles = {
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFEAB',
    alignItems: 'center',
    fontFamily: 'Montserrat',
  },
  body: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  logoutText: {
    fontWeight: 'bold',
    marginTop: 40,
    marginRight: 20,
    alignSelf: 'flex-end',
  },
  logoImage: {
    marginTop: 30,
    marginBottom: 15,
    resizeMode: 'contain',
    height: Dimensions.get('window').height / 3,
  },
};

export default styles;
