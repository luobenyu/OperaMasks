/*
 * $Id: StockModel.java,v 1.2 2007/12/11 04:14:14 jacky Exp $
 *
 * Copyright (C) 2006 Operamasks Community.
 * Copyright (C) 2000-2006 Apusic Systems, Inc.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see http://www.gnu.org/licenses.
 */
package demo.binding;

import java.util.Date;
import java.util.Random;
import java.util.List;
import java.util.Arrays;

import org.operamasks.faces.annotation.*;
import org.operamasks.faces.component.widget.grid.UIDataGrid;

@ManagedBean(scope=ManagedBeanScope.SESSION)
public class StockModel
{
    private Quote[] stockData = new Quote[] {
        new Quote("3m Co.", 71.72),
        new Quote("Alcoa Inc", 29.01),
        new Quote("Altria Group Inc.", 83.81),
        new Quote("American Express Company", 52.55),
        new Quote("American International Group, Inc.", 64.13),
        new Quote("Apusic Systems, Inc.", 87.08),
        new Quote("AT&T Inc.", 31.61),
        new Quote("Boeing Co.", 75.43),
        new Quote("Caterpillar Inc.", 67.27),
        new Quote("Citigroup, Inc.", 49.37),
        new Quote("E.I. du Pont de Nemours and Company", 40.48),
        new Quote("Exxon Mobil Corp", 68.1),
        new Quote("General Electric Company", 34.14),
        new Quote("General Motors Corporation", 30.27),
        new Quote("Hewlett-Packard Co.", 36.53),
        new Quote("Honeywell Intl Inc.", 38.77),
        new Quote("Intel Corporation", 19.88),
        new Quote("International Business Machines", 81.41),
        new Quote("Johnson & Johnson", 64.72),
        new Quote("JP Morgan & Chase & Co", 45.73),
        new Quote("McDonald's Corporation", 36.76),
        new Quote("Merck & Co., Inc.", 40.96),
    };

    private void update() {
        Date date = new Date();
        Random random = new Random();

        for (Quote quote : stockData) {
            int radix = random.nextInt(10);
            double change = quote.getPrice() * (5-radix) / 100;
            quote.setPrice(quote.getPrice() + change);
            quote.setChange(change);
            quote.setLastUpdated(date);
        }
    }

    private long lastUpdate = 0;

    @Bind(id="grid")
    private UIDataGrid grid;

    @DataModel(id="grid")
    public Quote[] getStockData() {
        long current = System.currentTimeMillis();
        if (current - lastUpdate > 10000) {
            update();
            lastUpdate = current;
            if (grid != null) {
                grid.reload();
            }
        }
        return stockData;
    }

    @DataModel(id="table")
    public List<Quote> listStockData() {
        return Arrays.asList(getStockData());
    }
    
    @Action
    public void grid_onrowselect() {}
    
    @Action
    public void nextRow() {
        grid.selectNextRow();
        updatePage();
    }

    @Action
    public void previousRow() {
        grid.selectPreviousRow();
        updatePage();
    }

    private void updatePage() {
        int row = grid.getSelectedRow();
        int rows = grid.getRows();
        if (row > 0 && rows > 0) {
            int first = (row / rows) * rows;
            if (first != grid.getFirst()) {
                grid.setFirst(first);
                grid.reload();
            }
        }
    }

    @Action
    public void refresh() {
        grid.reload();
    }
}
