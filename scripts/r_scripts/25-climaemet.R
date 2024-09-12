# This script was converted from a Jupyter notebook
# It downloads AEMET daily data using the climaemet package
#!/usr/bin/env python
# coding: utf-8

# In[1]:


install.packages("climaemet")


# In[2]:


library(climaemet)


# In[3]:


## Use this function to register your API Key temporarly or permanently
aemet_api_key("eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJyZXNsYW4zMTIxQGdtYWlsLmNvbSIsImp0aSI6ImZhNWQwOGFhLTc1NzUtNGQ2Mi05ZGIxLTUyYjM5ZjBkYTlmZSIsImlzcyI6IkFFTUVUIiwiaWF0IjoxNzIyNjkwMjYzLCJ1c2VySWQiOiJmYTVkMDhhYS03NTc1LTRkNjItOWRiMS01MmIzOWYwZGE5ZmUiLCJyb2xlIjoiIn0.WIqaJbiLtrwJx_I4VYGNZ1zaEt2qO0CIH2hq_xAypsQ", install = TRUE)


# In[4]:


start_date <- "1998-01-01"  # Start date
end_date <- "2023-12-31"    # End date


# In[5]:


# Fetch daily climatological data for all stations
daily_climatological_data <- aemet_daily_clim(
  start = start_date,
  end = end_date,
  verbose = TRUE
)


# In[6]:


head(daily_climatological_data)


# In[7]:


write.csv(daily_climatological_data, "../data/daily_climatological_data-with-r.csv", row.names = FALSE)


# In[ ]:




