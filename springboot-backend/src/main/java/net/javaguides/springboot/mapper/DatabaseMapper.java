package net.javaguides.springboot.mapper;


import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.javaguides.springboot.model.Database;
import net.javaguides.springboot.model.UserEntity;
import org.springframework.http.ResponseEntity;

import java.util.*;

public class DatabaseMapper {
    public Map<String,Map<String,Object>>toYamlMapAdd(List<Database> databases){
        Map<String,Map<String,Object>> dbMap = new LinkedHashMap<String,Map<String,Object>>();
        for(int i =0 ; i < databases.size() ; i++ ){
            Map<String,Object> dbFieldMap = new LinkedHashMap<String,Object>();
            if(databases.get(i).getDsn() != null){
                dbFieldMap.put("dsn",databases.get(i).getDsn());
            }
            if(databases.get(i).getLabel() != null){
                Map<String,String> labelsFieldMap = new HashMap<String,String>();
                if(databases.get(i).getHostName() != null){
                    labelsFieldMap.put("host",databases.get(i).getHostName());
                }
                if(databases.get(i).getServiceCode() != null){
                    labelsFieldMap.put("services_code",databases.get(i).getServiceCode());
                }
                dbFieldMap.put("labels",labelsFieldMap);
            }
            if(databases.get(i).getConnectSQL() != null){
                dbFieldMap.put("connect-sql",databases.get(i).getConnectSQL());
            }
            if(databases.get(i).getKeepConnect() != null){
                dbFieldMap.put("keep-connected",databases.get(i).getKeepConnect());
            }
            if(databases.get(i).getAutoCommit() != null){
                dbFieldMap.put("autocommit",databases.get(i).getAutoCommit());
            }
            dbMap.put(databases.get(i).getName(),dbFieldMap);
        }
        return dbMap;
    }
    public List<Database>toModelFromYaml(Map<String,Map<String,Object>> listDBMap, UserEntity user){
        //Map<String,Object> dbMap = new listDBMap.get();
            List<Database> result = new ArrayList<Database>();
            for (String key : listDBMap.keySet()) {
                Database db = new Database();
                Map<String,Object> value = listDBMap.get(key);
                System.out.println("Key: " + key + ", Value: " + value);
                db.setName(key);
                if(value.containsKey("dsn")){
                    db.setDsn(value.get("dsn").toString());
                }
//                if(value.containsKey("labels")){
//                    db.setLabel(value.get("labels").toString());
//                    ObjectMapper objectMapper = new ObjectMapper();
//                    try {
//                        Map<String, String> resultMap = objectMapper.readValue(value.get("labels").toString(), Map.class);
//                        db.setHostName(resultMap.get("host"));
//                        db.setServiceCode(resultMap.get("services_code"));
//                    } catch (JsonProcessingException e) {
//                        throw new RuntimeException(e);
//                    }
//                }
                if(value.containsKey("host")){
                    db.setHostName(value.get("host").toString());
                }
                if(value.containsKey("services_code")){
                    db.setServiceCode(value.get("services_code").toString());
                }
                if(value.containsKey("connect-sql")){
                    db.setConnectSQL(value.get("connect-sql").toString());
                }
                if(value.containsKey("keep-connected")){
                    db.setKeepConnect(value.get("keep-connected").toString());
                }
                if(value.containsKey("autocommit")){
                    db.setAutoCommit(value.get("autocommit").toString());
                }
                db.setUser(user);
                result.add(db);
            }
            return result;
    }
}
