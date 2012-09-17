package ningbo.media.service;

import java.util.List;

import ningbo.media.bean.SystemUser;
import ningbo.media.core.page.Pagination;
import ningbo.media.core.service.BaseService;

public interface SystemUserService extends BaseService<SystemUser, Integer> {
	
	public SystemUser login(String username, String password);
	
	public List<SystemUser> querySystemUserByName(String name);
	
	public Pagination<SystemUser> getAllByPage(int pageNo,int pageSize);
	

}