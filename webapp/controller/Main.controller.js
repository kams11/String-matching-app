sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
  "use strict";

  return Controller.extend("com.example.stringmatchingappdemo.controller.Main", {
    onInit: function() {
      var model = new JSONModel(sap.ui.require.toUrl("com/example/stringmatchingappdemo/model/employeedata.json"));
      this.getView().setModel(model);

      // Reset input fields and remove highlighting
      this.clearInputFields();
      this.removeHighlighting();
    },

    clearInputFields: function() {
      var employeeNumberInput = this.getView().byId("employeeNumberInput");
      var uidInput = this.getView().byId("uidInput");
      employeeNumberInput.setValue("");
      uidInput.setValue("");

      // Hide link buttons
      var link1 = this.getView().byId("link1");
      var link2 = this.getView().byId("link2");
      link1.setVisible(false);
      link2.setVisible(false);
    },

    removeHighlighting: function() {
      var employeeCityText = this.getView().byId("employeeCityText");
      var employeeStateText = this.getView().byId("employeeStateText");
      var employeeCountryText = this.getView().byId("employeeCountryText");
      var uidCityText = this.getView().byId("uidCityText");
      var uidStateText = this.getView().byId("uidStateText");
      var uidCountryText = this.getView().byId("uidCountryText");

      employeeCityText.removeStyleClass("matched");
      employeeStateText.removeStyleClass("matched");
      employeeCountryText.removeStyleClass("matched");
      uidCityText.removeStyleClass("matched");
      uidStateText.removeStyleClass("matched");
      uidCountryText.removeStyleClass("matched");
    },

    onEmployeeNumberChange: function(event) {
      this.removeHighlighting();

      var employeeNumber = event.getParameter("value");
      var employees = this.getView().getModel().getProperty("/employeeid");
      var employee = employees.find(function(emp) {
        return emp.employee_id === employeeNumber;
      });

     

      if (employee) {
        this.getView().getModel().setProperty("/employeeid/0", employee);
        this.getView().byId("link1").setVisible(false);
      } else {
        this.getView().getModel().setProperty("/employeeid/0", {});
        this.getView().byId("link1").setVisible(false);
      }
    },

    onUidChange: function(event) {
      this.removeHighlighting();

      var uid = event.getParameter("value");
      var employees = this.getView().getModel().getProperty("/employeeuid");
      var employee = employees.find(function(emp) {
        return emp.uid === uid;
      });

      if (employee) {
        this.getView().getModel().setProperty("/employeeuid/0", employee);
        this.getView().byId("link2").setVisible(false);
      } else {
        this.getView().getModel().setProperty("/employeeuid/0", {});
        this.getView().byId("link2").setVisible(false);
      }
    },

    onMatchButtonPress: function() {
      var employee = this.getView().getModel().getProperty("/employeeid/0");
      var employeeUid = this.getView().getModel().getProperty("/employeeuid/0");

      var employeeCity = this.sanitizeString(employee.city);
      var employeeState = this.sanitizeString(employee.state);
      var employeeCountry = this.sanitizeString(employee.country);

      var uidCity = this.sanitizeString(employeeUid.city);
      var uidState = this.sanitizeString(employeeUid.state);
      var uidCountry = this.sanitizeString(employeeUid.country);

      var citiesMatch = this.compareStrings(employeeCity, uidCity);
      var statesMatch = this.compareStrings(employeeState, uidState);
      var countriesMatch = this.compareStrings(employeeCountry, uidCountry);

      var model = this.getView().getModel();

      var isMatched = citiesMatch && statesMatch && countriesMatch;
      model.setProperty("/isMatched", isMatched);

      this.removeHighlighting();

       this.generateLink();
       var link1 = this.getView().byId("link1");
      var link2 = this.getView().byId("link2");

      if (citiesMatch) {
        link1.setVisible(true);
        link2.setVisible(true);
      } else {
        link1.setVisible(false);
        link2.setVisible(false);
      }
      

      var employeeCityText = this.getView().byId("employeeCityText");
      var employeeStateText = this.getView().byId("employeeStateText");
      var employeeCountryText = this.getView().byId("employeeCountryText");
      var uidCityText = this.getView().byId("uidCityText");
      var uidStateText = this.getView().byId("uidStateText");
      var uidCountryText = this.getView().byId("uidCountryText");

      if (citiesMatch) {
        employeeCityText.addStyleClass("matched");
        uidCityText.addStyleClass("matched");
      }

      if (statesMatch) {
        employeeStateText.addStyleClass("matched");
        uidStateText.addStyleClass("matched");
      }

      if (countriesMatch) {
        employeeCountryText.addStyleClass("matched");
        uidCountryText.addStyleClass("matched");
      }
    },
    generateLink: function(citiesMatch, statesMatch, countriesMatch){

      
      
      var link1 = this.getView().byId("link1");

      if (citiesMatch,statesMatch, countriesMatch) {
        link1.setVisible(true);
      } else {
        link1.setVisible(false);
      }
    
    },

    sanitizeString: function(str) {
      return str.replace(/[\s\W]/g, "").toUpperCase();
    },

    compareStrings: function(str1, str2) {
      return str1 === str2;
    }
  });
});
