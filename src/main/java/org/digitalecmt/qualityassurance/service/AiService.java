package org.digitalecmt.qualityassurance.service;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.digitalecmt.qualityassurance.models.pojo.AiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.nimbusds.jose.shaded.gson.Gson;
import com.nimbusds.jose.shaded.gson.JsonObject;

/**
 * Service class for interacting with the AI prediction service.
 */
@Service
public class AiService {

    @Value("${prediction.url}")
    private String url = "http://localhost:8088/prediction";

    /**
     * Sends a prediction request to the AI service.
     *
     * @param dvspondes the query string for the AI service
     * @param numberOfPredictions the number of predictions to request
     * @return an array of AiResponse objects containing the predictions, or null if the request failed
     */
    public AiResponse[] predict(String dvspondes, Long numberOfPredictions) {
        JsonObject payload = new JsonObject();
        payload.addProperty("query", dvspondes);
        payload.addProperty("num_predictions", numberOfPredictions.toString());

        try (CloseableHttpClient httpClient = HttpClients.createDefault()) {
            HttpPost httpPost = new HttpPost(url);
            httpPost.setHeader("Content-Type", "application/json");
            httpPost.setEntity(new StringEntity(payload.toString()));

            CloseableHttpResponse response = httpClient.execute(httpPost);
            int statusCode = response.getStatusLine().getStatusCode();

            if (statusCode == HttpStatus.OK.value()) {
                String jsonRes = EntityUtils.toString(response.getEntity());
                Gson gson = new Gson();
                AiResponse[] responseBody = gson.fromJson(jsonRes, AiResponse[].class);
                return responseBody;
            } else {
                return null;
            }
        } catch (Exception e) {
            return null;
        }
    }
}
