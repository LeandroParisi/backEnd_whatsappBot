INSERT INTO public.coupons (coupomCode,discountType,discount,used,priceLimit,dateLimit,distanceLimitInKm,usesLimit,freeDelivery,isActive,updatedAt,createdAt) VALUES
	 ('cupom_usos','percentage',10.30,0,NULL,NULL,NULL,10,true,true,'2022-04-11 21:54:40.97125-03','2022-04-11 21:54:40.97125-03'),
	 ('cupom_distancia','absolute_value',15.00,0,NULL,NULL,15,NULL,true,true,'2022-04-11 21:54:40.97125-03','2022-04-11 21:54:40.97125-03'),
	 ('cupom_data_preco','absolute_value',20.00,0,20.20,'2022-01-10 00:00:00-03',NULL,NULL,false,true,'2022-04-11 21:54:40.97125-03','2022-04-11 21:54:40.97125-03');