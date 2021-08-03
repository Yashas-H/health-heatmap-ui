import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Layout from "../../components/Layout";
import { DashboardChart } from 'components/DashboardChart/DashboardChart';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        //margin:'0px auto'
    },

    gridWrapper: {
        margin: '0 auto'
    },
    image: {
        width: '100%',
        minHeight: '250px',
        border: '1px solid black',
        backgroundColor: '#1D75D9',
        padding: '50px 100px',
    },
    title: {
        fontSize: 40,
        color: 'white',
        height: 'fit-content'
    },
    titleText: {
        height: '100%',
        fontSize: '26px',
        color: 'white'

    }
}));

export default function SpacingGrid() {
    //const [spacing, setSpacing] = React.useState(4);
    const classes = useStyles();
    let a=(<Grid xs={5} style={{ border: "1px solid black", padding: '16px', margin: '10px 0px' }} item>
    It is a long established fact that a reader will be distracted by the readable
    content of a page when looking at its layout. The point of using Lorem Ipsum
    is that it has a more-or-less normal distribution of letters, as opposed to
    using 'Content here, content here', making it look like readable English.
    Many desktop publishing packages and web page editors now use Lorem Ipsum
    as their default model text, and a search for 'lorem ipsum' will uncover
    many web sites still in their infancy. Various versions have evolved over the years,
    sometimes by accident, sometimes on purpose (injected humour and the like).
</Grid>)

    return (
        <Layout>
            <Grid container className={classes.root} xs={12}>
                <Grid container item xs={12}>
                    <Grid container item xs={12} className={classes.image}>
                        <Grid container item xs={12} className={classes.title}>Karnataka Covid</Grid>
                        <Grid container item xs={12} className={classes.titleText}>
                            It is a long established fact that a reader will be distracted by the readable
                            content of a page when looking at its layout. The point of using Lorem Ipsum
                            is that it has a more-or-less normal distribution of letters, as opposed to
                            using 'Content here, content here', making it look like readable English.
                            Many desktop publishing packages and web page editors now use Lorem Ipsum
                            as their default model text, and a search for 'lorem ipsum' will uncover
                            many web sites still in their infancy. Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose (injected humour and the like).
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} >
                    <Grid container className={classes.gridWrapper} justifyContent="center" spacing={0}>
                        {/* {[0, 1, 2,3,4,5].map((value) => (
                        <Grid key={value} xs={5} style={{ border: "1px solid black",padding:'16px',margin:'10px' }} item>
                            hi
                        </Grid>
                    ))} */}
                        <Grid xs={5} style={{ border: "1px solid black", padding: '16px', margin: '10px 0px' }} item>
                            hi
                        </Grid>
                        <Grid xs={5} style={{ border: "1px solid black", padding: '16px', margin: '10px 0px' }} item>
                            It is a long established fact that a reader will be distracted by the readable
                            content of a page when looking at its layout. The point of using Lorem Ipsum
                            is that it has a more-or-less normal distribution of letters, as opposed to
                            using 'Content here, content here', making it look like readable English.
                            Many desktop publishing packages and web page editors now use Lorem Ipsum
                            as their default model text, and a search for 'lorem ipsum' will uncover
                            many web sites still in their infancy. Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose (injected humour and the like).
                        </Grid>
                        <Grid xs={10} style={{ border: "1px solid black", padding: '16px', margin: '10px' }} item>
                            It is a long established fact that a reader will be distracted by the readable
                            content of a page when looking at its layout. The point of using Lorem Ipsum
                            is that it has a more-or-less normal distribution of letters, as opposed to
                            using 'Content here, content here', making it look like readable English.
                            Many desktop publishing packages and web page editors now use Lorem Ipsum
                            as their default model text, and a search for 'lorem ipsum' will uncover
                            many web sites still in their infancy. Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose (injected humour and the like). <br />
                            It is a long established fact that a reader will be distracted by the readable
                            content of a page when looking at its layout. The point of using Lorem Ipsum
                            is that it has a more-or-less normal distribution of letters, as opposed to
                            using 'Content here, content here', making it look like readable English.
                            Many desktop publishing packages and web page editors now use Lorem Ipsum
                            as their default model text, and a search for 'lorem ipsum' will uncover
                            many web sites still in their infancy. Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose (injected humour and the like).
                        </Grid>
                        <Grid xs={5} style={{ border: "1px solid black", padding: '16px', margin: '10px 0px' }} item>
                            hi
                        </Grid>
                        <Grid xs={5} style={{ border: "1px solid black", padding: '16px', margin: '10px 0px' }} item>
                            It is a long established fact that a reader will be distracted by the readable
                            content of a page when looking at its layout. The point of using Lorem Ipsum
                            is that it has a more-or-less normal distribution of letters, as opposed to
                            using 'Content here, content here', making it look like readable English.
                            Many desktop publishing packages and web page editors now use Lorem Ipsum
                            as their default model text, and a search for 'lorem ipsum' will uncover
                            many web sites still in their infancy. Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose (injected humour and the like).
                        </Grid>
                        <Grid xs={5} style={{ border: "1px solid black", padding: '16px', margin: '10px 0px' }} item>
                            It is a long established fact that a reader will be distracted by the readable
                            content of a page when looking at its layout. The point of using Lorem Ipsum
                            is that it has a more-or-less normal distribution of letters, as opposed to
                            using 'Content here, content here', making it look like readable English.
                            Many desktop publishing packages and web page editors now use Lorem Ipsum
                            as their default model text, and a search for 'lorem ipsum' will uncover
                            many web sites still in their infancy. Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose (injected humour and the like). <br />
                            It is a long established fact that a reader will be distracted by the readable
                            content of a page when looking at its layout. The point of using Lorem Ipsum
                            is that it has a more-or-less normal distribution of letters, as opposed to
                            using 'Content here, content here', making it look like readable English.
                            Many desktop publishing packages and web page editors now use Lorem Ipsum
                            as their default model text, and a search for 'lorem ipsum' will uncover
                            many web sites still in their infancy. Various versions have evolved over the years,
                            sometimes by accident, sometimes on purpose (injected humour and the like).
                        </Grid>
                        {a}

                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );
}