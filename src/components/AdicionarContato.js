import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableHighlight,
  Dimensions
} from "react-native";

import { Font } from "expo";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Actions } from "react-native-router-flux";
import { connect } from "react-redux";
import Toast from "react-native-root-toast";

import {
  modificaAdiconaContatoEmail,
  adicionaContato
} from "../actions/AppActions";

const { width: WIDTH } = Dimensions.get("window");

class AdicionarContato extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Azonix: require("../fonts/Azonix.otf"),
      "Lato-Bold": require("../fonts/Lato-Bold.ttf"),
      "Lato-Light": require("../fonts/Lato-Light.ttf"),
      "Lato-Medium": require("../fonts/Lato-Medium.ttf"),
      "Lato-Regular": require("../fonts/Lato-Regular.ttf")
    });
    this.setState({
      fontLoaded: true
    });
  }

  renderAdicionarContato() {
    if (!this.props.cadastroResultadoInclusao) {
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.navBarStyle}>
            <View style={{ marginLeft: 15 }}>
              <TouchableHighlight
                underlayColor={"#161C5C"}
                activeOpacity={0.3}
                onPress={() => {
                  Actions.pop();
                }}
              >
                <Ionicons
                  name="ios-arrow-back"
                  size={30}
                  color={"#fff"}
                  style={{
                    backgroundColor: "transparent",
                    justifyContent: "center"
                  }}
                />
              </TouchableHighlight>
            </View>
            <View style={{ marginLeft: 100 }}>
              <Text style={styles.txtTitle}>Adicionar Contato</Text>
            </View>
          </View>
          <View style={styles.inputContainer}>
            <View style={styles.inputStylesEmail}>
              <MaterialCommunityIcons
                name="email-outline"
                size={25}
                color={"#959595"}
                style={{
                  backgroundColor: "transparent",
                  position: "absolute",
                  justifyContent: "center",
                  top: 14,
                  left: 19
                }}
              />
              <TextInput
                placeholder="Email"
                placeholderTextColor="#959595"
                autoCapitalize="none"
                value={this.props.adiciona_contato_email}
                onChangeText={email =>
                  this.props.modificaAdiconaContatoEmail(email)
                }
                style={styles.txtInputEmail}
              />
            </View>
          </View>
          {this.props.erroCadastro == "" ? (
            <View>
              <Text>{""}</Text>
            </View>
          ) : (
            <View>
              <Text style={styles.textErro}>{this.props.erroCadastro}</Text>
            </View>
          )}
          <View style={styles.btnContainer}>
            <TouchableHighlight
              underlayColor={"#0b7dfa"}
              activeOpacity={0.3}
              onPress={() =>
                this.props.adicionaContato(this.props.adiciona_contato_email)
              }
              style={{ borderRadius: 8 }}
            >
              <Text style={styles.txtBtn}>ADICIONAR CONTATO</Text>
            </TouchableHighlight>
          </View>
        </View>
      );
    } else {
      return (
        <View style={styles.sucessoView}>
          <Text style={styles.textSucesso}>
            Cadastro realizado com sucesso!
          </Text>
        </View>
      );
    }
  }

  render() {
    if (this.state.fontLoaded != true) {
      return <View />;
    }

    return (
      <View style={styles.viewContainer}>{this.renderAdicionarContato()}</View>
    );
  }
}

const mapStateToProps = state => ({
  adiciona_contato_email: state.AppReducer.adiciona_contato_email,
  erroCadastro: state.AppReducer.erroCadastro,
  cadastroResultadoInclusao: state.AppReducer.cadastroResultadoInclusao
});
export default connect(
  mapStateToProps,
  {
    modificaAdiconaContatoEmail,
    adicionaContato
  }
)(AdicionarContato);

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center"
  },
  navBarStyle: {
    flexDirection: "row",
    height: 60,
    backgroundColor: "#161C5C",
    alignItems: "center",
    width: WIDTH,
    elevation: 5
  },
  txtTitle: {
    fontFamily: "Lato-Regular",
    color: "#fff",
    fontSize: 19
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    top: 30
  },
  inputStylesEmail: {
    width: WIDTH - 70,
    marginBottom: 27,
    padding: 14,
    borderRadius: 8,
    flexDirection: "row",
    borderColor: "#959595",
    borderWidth: 3
  },
  txtInputEmail: {
    color: "#959595",
    fontFamily: "Lato-Regular",
    fontSize: 15,
    left: 48
  },
  btnContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  txtBtn: {
    textAlign: "center",
    backgroundColor: "#0b7dfa",
    borderRadius: 8,
    color: "#fff",
    fontSize: 18,
    padding: 14,
    width: WIDTH - 70,
    fontFamily: "Lato-Regular"
  },
  errorView: {
    backgroundColor: "#ff0000",
    padding: 5,
    top: 30,
    borderRadius: 10,
    alignItems: "center"
  },
  textErro: {
    color: "#ff0000",
    fontSize: 16,
    fontFamily: "Lato-Regular",
    textAlign: "center"
  },
  sucessoView: {
    backgroundColor: "#009a00",
    padding: 5,
    top: 30,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center"
  },
  textSucesso: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Lato-Regular",
    textAlign: "center"
  }
});
