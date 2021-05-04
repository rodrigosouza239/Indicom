import { Dimensions } from 'react-native';

const styles = {
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFEAB',
    alignItems: 'center',
    fontFamily: 'Montserrat',
    paddingTop: 0,
  },
  completeCadastroWrapper: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFEAB',
    alignItems: 'center',
    fontFamily: 'Montserrat',
    paddingTop: 60,
  },
  container: {
    alignItems: 'center',
    marginBottom: 30,
  },
  imageContainer: {
    resizeMode: 'contain',
    height: Dimensions.get('window').height / 3,
  },
  subTitle: {
    fontWeight: '600',
    marginTop: 40,
    marginBottom: 20,
    fontSize: 18,
  },
  socialMediaContainer: {
    width: '80%',
  },
  customLink: {
    color: '#0015D5',
    textDecorationLine: 'underline',
    fontWeight: '600',
    fontSize: 16,
  },
};

export default styles;
