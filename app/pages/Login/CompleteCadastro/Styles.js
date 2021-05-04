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
    width: '70%',
    marginBottom: 30,
  },
  customLink: {
    color: '#0015D5',
    textDecorationLine: 'underline',
    fontWeight: '600',
    fontSize: 16,
  },
};

export default styles;
