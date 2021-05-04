import { Dimensions } from 'react-native';

const styles = {
  wrapper: {
    flexDirection: 'column',
    backgroundColor: '#FFFEAB',
    alignItems: 'center',
    height: '100%',
    fontFamily: 'Montserrat',
    overflow: 'scroll',
  },
  container: {
    alignItems: 'center',
  },
  iconImg: {
    resizeMode: 'contain',
    height: Dimensions.get('window').height / 7,
    marginTop: 40,
  },
  bemVindoText: {
    marginTop: 10,
  },
  subTitle: {
    fontWeight: '600',
    marginTop: 20,
    fontSize: 22,
    marginBottom: 5,
  },
  labelFormText: {
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    fontSize: 16,
  },
  socialMediaContainer: {
    width: '80%',
    marginBottom: 30,
    marginTop: 20,
  },
  dropdownContainer: {
    marginTop: 15,
  },
  empregoTitle: {
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
  },
  empregoSubTitle: {
    marginTop: 5,
    fontWeight: '500',
    color: 'gray',
  },
};

export default styles;
