package com.stripe.controller;

import com.google.gson.Gson;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.CheckoutPayment;
import com.stripe.model.checkout.Session;
import com.stripe.param.checkout.SessionCreateParams;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api")
@CrossOrigin("*")
public class StripeController {
    private static Gson gson = new Gson();

    private static void init() {
        Stripe.apiKey = "PLACE_YOUR_SECRET_KEY";
    }
    @PostMapping("/create-checkout-session")
    public ResponseEntity<String> checkout(@RequestBody CheckoutPayment payment) throws StripeException {
        init();
        SessionCreateParams params =
                SessionCreateParams.builder()
                        .addPaymentMethodType(SessionCreateParams.PaymentMethodType.CARD)
                        .setMode(SessionCreateParams.Mode.PAYMENT)
                        .setCancelUrl(payment.getCancelUrl())
                        .setSuccessUrl(payment.getSuccessUrl())
                        .addLineItem(
                                SessionCreateParams.LineItem.builder()
                                        .setQuantity(payment.getQuantity())
                                        .setPriceData(
                                                SessionCreateParams.LineItem.PriceData.builder()
                                                        .setCurrency(payment.getCurrency())
                                                        .setUnitAmount(payment.getAmount() * 100)
                                                        .setProductData(
                                                                SessionCreateParams.LineItem.PriceData.ProductData.builder()
                                                                        .setName(payment.getName())
                                                                        .setDescription("This is a test purchase")
                                                                        .addImage(payment.getImage())
                                                                        .build())
                                                        .build())
                                        .build()
                        )
                        .build();
        Session session = Session.create(params);
        return ResponseEntity.ok(session.getId());
    }

    @GetMapping({"/session/{sessionId}"})
    public String paymentIntentSend(@PathVariable String sessionId) {
        init();
        try {
            Session session = Session.retrieve(sessionId);
            return gson.toJson(session.getPaymentIntent());
        } catch (StripeException e) {
            throw new RuntimeException(e);
        }
    }

}

