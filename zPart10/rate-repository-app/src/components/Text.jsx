import { Text as NativeText, StyleSheet, Platform } from "react-native";
import { React } from 'react'
import theme from "../theme";

const styles = StyleSheet.create({
    text: {
        color: theme.colors.textLong,
        fontSize: theme.fontSizes.body,
        fontFamily: Platform.select({ android: 'Roboto', ios: 'Arial' }),
        fontWeight: theme.fontWeights.normal,
    },
    colorTextSecondary: {
        color: theme.colors.textSecondary
    },
    colorTextPrimary: {
        color: theme.colors.textPrimary
    },
    colorPrimary: {
        color: theme.colors.backG
    },
    fontSizeSubheading: {
        fontSize: theme.fontSizes.subheading,
    },
    fontSizeHeading: {
        fontSize: theme.fontSizes.heading,
    },
    fontWeightBold: {
        fontWeight: theme.fontWeights.bold,
    },
    center: {
        textAlign: 'center'
    }
});

const Text = ({ color, fontSize, fontWeight, style, center, ...props}) => {
    const textStyle = [
        styles.text,
        color === 'textSecondary'&& styles.colorTextSecondary,
        color === 'textPrimary'&& styles.colorTextPrimary,
        color === 'primary' && styles.colorPrimary,
        fontSize === 'subheading' && styles.fontSizeSubheading,
        fontSize === 'heading' && styles.fontSizeHeading,
        fontWeight === 'bold' && styles.fontWeightBold,
        center === 'center' && styles.center,
        style
    ]

    return <NativeText style={textStyle} {...props} />;
}

export default Text