import React, { useState, useContext, useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import AuthContext from '../../contexts/auth';
import Styles from './Styles';
import * as Utils from './Utils';
import Api from '../../services/Api';

import Button from '../Button';
import Input from '../Input';
import Select from '../Select';

const InformacoesForm = ({
  currentUser,
  handleCadastro,
  buttonLabel,
  buttonStyles,
  textColor,
  textWeigth,
}) => {
  const { setLoading } = useContext(AuthContext);
  const [tipoPessoa] = useState([
    { label: 'Pessoa Física', value: 'PF' },
    { label: 'Pessoa Jurídica', value: 'PJ' },
  ]);
  const [activitiesBranches, setActivitiesBranches] = useState([]);
  const [economicsActivites, setEconomicsActivities] = useState([]);

  useEffect(() => {
    const fetchApiData = async () => {
      setLoading(true);
      const responseActivitiesBranches = await Api.get(
        'v1/activities-branches'
      );
      if (responseActivitiesBranches.status !== 200) {
        Alert.alert(
          'Atenção',
          'Houve um erro no servidor, reinicie a aplicação'
        );
      } else {
        setActivitiesBranches(
          responseActivitiesBranches.data.map((i) => {
            return { Name: i.name, Id: String(i.id) };
          })
        );
        const responseEconomicsActivities = await Api.get(
          'v1/economics-activities'
        );
        if (responseEconomicsActivities.status !== 200) {
          Alert.alert(
            'Atenção',
            'Houve um erro no servidor, reinicie a aplicação'
          );
        } else {
          setEconomicsActivities(
            responseEconomicsActivities.data.map((i) => {
              return { label: i.name, value: String(i.id) };
            })
          );
          setLoading(false);
        }
      }
    };

    fetchApiData();
  }, []);
  return (
    <View style={Styles.wrapper}>
      <Formik
        enableReinitialize
        initialValues={{
          tipoPessoa: currentUser.type,
          ramoAtividade: String(currentUser.activityBranchId) || '',
          nomeEmpresa: currentUser.companyName || '',
          atividadeEconomica: String(currentUser.economicActivityId) || '',
          celular: currentUser.whatsapp || '',
          website: currentUser.website || '',
          facebook: currentUser.facebook || '',
        }}
        onSubmit={(data) => handleCadastro(data)}
        validationSchema={yup.object().shape({
          tipoPessoa: yup.string().required(),
          ramoAtividade: yup.string().when('tipoPessoa', {
            is: 'PF',
            then: yup.string().required(),
          }),
          nomeEmpresa: yup.string().when('tipoPessoa', {
            is: 'PJ',
            then: yup.string().required(),
          }),
          atividadeEconomica: yup.string().when('tipoPessoa', {
            is: 'PJ',
            then: yup.string().required(),
          }),
          celular: yup.string().min(14).max(15).required(),
          website: yup.string(),
          facebook: yup.string(),
        })}
      >
        {({
          handleChange,
          setFieldValue,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => {
          return (
            <View style={Styles.socialMediaContainer}>
              <Text style={Styles.labelFormText}>Sou:</Text>
              <Select
                customStyle={{ marginBottom: 13 }}
                value={values.tipoPessoa}
                placeholder={{}}
                onValueChange={handleChange('tipoPessoa')}
                error={errors.tipoPessoa}
                items={tipoPessoa}
              />
              <Select
                customStyle={{
                  marginBottom: 13,
                  display: values.tipoPessoa === 'PJ' ? 'none' : 'flex',
                }}
                value={values.ramoAtividade}
                placeholder={{ label: 'Profissão', value: '' }}
                onValueChange={handleChange('ramoAtividade').bind(this)}
                error={errors.ramoAtividade}
                items={activitiesBranches}
                isSearchable={values.tipoPessoa === 'PJ' ? false : true}
              />
              <Input
                onChangeText={handleChange('nomeEmpresa')}
                onBlur={handleBlur('nomeEmpresa')}
                placeholder="Nome da Empresa:"
                textContentType="name"
                customStyle={{
                  marginBottom: 13,
                  display: values.tipoPessoa === 'PF' ? 'none' : 'flex',
                }}
                error={errors.nomeEmpresa}
                value={values.nomeEmpresa}
              />
              <Select
                customStyle={{
                  marginBottom: 13,
                  display: values.tipoPessoa === 'PF' ? 'none' : 'none',
                }}
                value={values.atividadeEconomica}
                placeholder={{ label: 'Atividade Econômica', value: '' }}
                onValueChange={handleChange('atividadeEconomica')}
                error={errors.atividadeEconomica}
                items={economicsActivites}
              />

              <Text style={Styles.labelFormText}>Contatos:</Text>
              <Input
                onChangeText={(e) =>
                  setFieldValue('celular', Utils.phoneMaskInput(e))
                }
                onBlur={handleBlur('celular')}
                placeholder="WhatsApp:"
                textContentType="telephoneNumber"
                keyboardType="number-pad"
                maxLength={15}
                customStyle={{ marginBottom: 13 }}
                error={errors.celular}
                value={values.celular}
              />
              <Input
                onChangeText={handleChange('website')}
                onBlur={handleBlur('website')}
                placeholder="Website:"
                textContentType="name"
                customStyle={{ marginBottom: 13 }}
                error={errors.website}
                value={values.website}
              />
              <Input
                onChangeText={handleChange('facebook')}
                onBlur={handleBlur('facebook')}
                placeholder="Perfil do Facebook:"
                textContentType="name"
                customStyle={{ marginBottom: 13 }}
                error={errors.facebook}
                value={values.facebook}
              />
              <View style={Styles.buttonContainer}>
                <Button
                  onPress={handleSubmit}
                  disabled={!isValid}
                  customStyles={{
                    alignSelf: 'center',
                    backgroundColor: '#FFD500',
                    marginTop: 15,
                    ...buttonStyles,
                  }}
                  textColor={textColor}
                  textWeigth={textWeigth}
                  label={buttonLabel}
                />
              </View>
            </View>
          );
        }}
      </Formik>
    </View>
  );
};

export default InformacoesForm;
