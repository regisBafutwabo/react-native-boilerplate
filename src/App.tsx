import React, { Component } from "react";
import { Text } from "react-native";
import { ThemeProvider } from "styled-components/native";
import codePush from "react-native-code-push";
import BootSplash from "react-native-bootsplash";
import { ApolloProvider } from "@apollo/react-hooks";

import RouterActions from "@Services/RouterActions";
import { theme } from "@Definitions/Styled";
import { IS_STORYBOOK } from "react-native-dotenv";
import AppContainer from "@Router";
import { I18n } from "@I18n";
import { SafeArea } from "@Styled";


// Storybook server
import StoryBookUIRoot from "../storybook";

// Configure Apollo Client
import { getApolloClient, TCacheShape } from "@Graphql";

class App extends Component<{}, {client: any}> {
    constructor(props: any) {
        super(props);
        this.state = {
            client: undefined,
        }
    }

    public componentDidMount(): void {
        I18n.init();
        BootSplash.hide();
        getApolloClient().then((c: TCacheShape) => this.setState({client: c}));
    }

    public render(): JSX.Element {
        const { client } = this.state;

        if (IS_STORYBOOK === "true")
            return (
                <StoryBookUIRoot /> 
            )
        if (typeof client === "undefined") {
                return (
                    <Text>Loading...</Text>
                )
            } 
                return (
                    <ApolloProvider client={client}>
                        <ThemeProvider theme={theme}>
                            <SafeArea>
                                <AppContainer
                                    ref={(ref: object) =>
                                        RouterActions.setNavigationReference(ref)
                                    }
                                />
                            </SafeArea>
                        </ThemeProvider>
                    </ApolloProvider>
                );
            
    }
}

const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

const exportedApp = IS_STORYBOOK ? App : codePush(codePushOptions) (App);

export default exportedApp;

