import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';

const CouponCard = ({ coupon }) => {
    return (
        <Card sx={{ maxWidth: 345, margin: 'auto' }}>
            <CardMedia
                component="img"
                height="140"
                image={coupon.imageUrl}
                alt={coupon.title}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {coupon.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {coupon.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ marginTop: 2 }}>
                    Code: {coupon.code}
                </Typography>
            </CardContent>
            <Button size="small" color="primary" sx={{ margin: 2 }}>
                Redeem Now
            </Button>
        </Card>
    );
};

export default CouponCard;
